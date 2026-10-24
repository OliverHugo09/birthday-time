// js/app.js
/**
 * Aplicación principal - Landing Maomao Birthday Time
 * Carga datos desde data/birthdays.json, renderiza tarjetas con contadores regresivos
 * Cumple: RF-01, RF-02, RF-03, RF-04, RNF-03, RNF-06, RNF-02
 */

import { getCountdownText } from './countdown.js';

/**
 * Carga datos de cumpleaños desde JSON estático
 * @returns {Promise<Array>} Array de objetos {name, date, note, gifts}
 */
async function loadBirthdays() {
    try {
        const response = await fetch('./data/birthdays.json');
        if (!response.ok) {
            throw new Error(`Error al cargar datos: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
            throw new Error('Formato inválido: se esperaba un array');
        }
        return data;
    } catch (error) {
        throw error;
    }
}

/**
 * Crea un icono SVG de hierba/flor decorativo
 * @returns {SVGElement}
 */
function createHerbIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'birthday-card__herb-icon');
    svg.setAttribute('viewBox', '0 0 36 36');
    svg.setAttribute('aria-hidden', 'true');

    // Tallo
    const stem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    stem.setAttribute('d', 'M 18 30 Q 18 22, 18 18 Q 18 14, 16 12 Q 14 10, 18 8 Q 22 10, 20 12 Q 18 14, 18 18');
    stem.setAttribute('stroke', 'var(--color-primary)');
    stem.setAttribute('stroke-width', '2');
    stem.setAttribute('fill', 'none');
    stem.setAttribute('opacity', '0.8');

    // Hojas
    const leaf1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leaf1.setAttribute('d', 'M 18 18 Q 12 16, 8 18 Q 12 20, 18 18');
    leaf1.setAttribute('fill', 'var(--color-secondary)');
    leaf1.setAttribute('opacity', '0.7');

    const leaf2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leaf2.setAttribute('d', 'M 18 18 Q 24 16, 28 18 Q 24 20, 18 18');
    leaf2.setAttribute('fill', 'var(--color-secondary)');
    leaf2.setAttribute('opacity', '0.7');

    // Flor central
    const flower = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    flower.setAttribute('cx', '18');
    flower.setAttribute('cy', '8');
    flower.setAttribute('r', '5');
    flower.setAttribute('fill', 'var(--color-accent-gold)');
    flower.setAttribute('opacity', '0.9');

    // Detalle centro flor
    const center = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    center.setAttribute('cx', '18');
    center.setAttribute('cy', '8');
    center.setAttribute('r', '2');
    center.setAttribute('fill', 'var(--color-accent-red)');
    center.setAttribute('opacity', '0.8');

    svg.appendChild(stem);
    svg.appendChild(leaf1);
    svg.appendChild(leaf2);
    svg.appendChild(flower);
    svg.appendChild(center);

    return svg;
}

/**
 * Crea icono SVG para regalos
 * @returns {SVGElement}
 */
function createGiftIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'birthday-card__gifts-icon');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('aria-hidden', 'true');

    const box = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    box.setAttribute('x', '2');
    box.setAttribute('y', '3');
    box.setAttribute('width', '12');
    box.setAttribute('height', '10');
    box.setAttribute('fill', 'none');
    box.setAttribute('stroke', 'currentColor');
    box.setAttribute('stroke-width', '1.2');

    const lid = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    lid.setAttribute('d', 'M 2 3 L 0 1 L 16 1 L 14 3');
    lid.setAttribute('fill', 'none');
    lid.setAttribute('stroke', 'currentColor');
    lid.setAttribute('stroke-width', '1.2');

    const ribbon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    ribbon.setAttribute('d', 'M 8 1 L 8 3 M 5 5 L 11 5');
    ribbon.setAttribute('stroke', 'var(--color-accent-red)');
    ribbon.setAttribute('stroke-width', '1');
    ribbon.setAttribute('fill', 'none');

    svg.appendChild(box);
    svg.appendChild(lid);
    svg.appendChild(ribbon);

    return svg;
}

/**
 * Crea icono SVG para contador
 * @returns {SVGElement}
 */
function createCountdownIcon() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'birthday-card__countdown-label-icon');
    svg.setAttribute('viewBox', '0 0 14 14');
    svg.setAttribute('aria-hidden', 'true');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '7');
    circle.setAttribute('cy', '7');
    circle.setAttribute('r', '6');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke', 'currentColor');
    circle.setAttribute('stroke-width', '1.2');

    const hourHand = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    hourHand.setAttribute('d', 'M 7 7 L 7 3');
    hourHand.setAttribute('stroke', 'currentColor');
    hourHand.setAttribute('stroke-width', '1.2');
    hourHand.setAttribute('stroke-linecap', 'round');

    const minHand = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    minHand.setAttribute('d', 'M 7 7 L 11 7');
    minHand.setAttribute('stroke', 'currentColor');
    minHand.setAttribute('stroke-width', '1');
    minHand.setAttribute('stroke-linecap', 'round');

    svg.appendChild(circle);
    svg.appendChild(hourHand);
    svg.appendChild(minHand);

    return svg;
}

/**
 * Crea decoración de esquina
 * @param {boolean} flippedX - Voltear horizontalmente
 * @param {boolean} flippedY - Voltear verticalmente
 * @returns {SVGElement}
 */
function createCornerDecoration(flippedX = false, flippedY = false) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'birthday-card__corner');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('aria-hidden', 'true');

    let transform = '';
    if (flippedX && flippedY) transform = 'scale(-1, -1)';
    else if (flippedX) transform = 'scale(-1, 1)';
    else if (flippedY) transform = 'scale(1, -1)';
    if (transform) svg.setAttribute('transform', transform);

    const leaf = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    leaf.setAttribute('d', 'M 2 14 Q 4 10, 8 14 Q 6 10, 4 6 Q 2 10, 2 14');
    leaf.setAttribute('fill', 'var(--color-primary)');
    leaf.setAttribute('opacity', '0.5');

    svg.appendChild(leaf);
    return svg;
}

/**
 * Renderiza la lista de cumpleaños
 * @param {Array} birthdays
 */
function renderBirthdays(birthdays) {
    const listElement = document.getElementById('birthdays-list');
    const errorElement = document.getElementById('error-message');

    if (errorElement) errorElement.style.display = 'none';
    if (listElement) listElement.textContent = '';

    if (!birthdays || birthdays.length === 0) {
        if (errorElement) {
            errorElement.textContent = 'No hay cumpleaños para mostrar.';
            errorElement.style.display = 'block';
        }
        return;
    }

    const countdownElements = [];

    birthdays.forEach(birthday => {
        if (!birthday.name || !birthday.date) {
            console.warn('Elemento incompleto omitido:', birthday);
            return;
        }

        const card = document.createElement('article');
        card.className = 'birthday-card';
        card.setAttribute('aria-label', `Cumpleaños de ${birthday.name}`);

        // Esquinas decorativas
        card.appendChild(createCornerDecoration(false, false)); // TL
        card.appendChild(createCornerDecoration(true, false));  // TR
        card.appendChild(createCornerDecoration(false, true));  // BL
        card.appendChild(createCornerDecoration(true, true));   // BR

        const contentDiv = document.createElement('div');
        contentDiv.className = 'birthday-card__content';

        // Header con icono y nombre/fecha
        const headerDiv = document.createElement('div');
        headerDiv.className = 'birthday-card__header';

        headerDiv.appendChild(createHerbIcon());

        const nameGroup = document.createElement('div');
        nameGroup.className = 'birthday-card__name-group';

        const nameEl = document.createElement('h2');
        nameEl.className = 'birthday-card__name';
        nameEl.textContent = birthday.name;
        nameGroup.appendChild(nameEl);

        const dateEl = document.createElement('p');
        dateEl.className = 'birthday-card__date';
        dateEl.textContent = birthday.date;
        nameGroup.appendChild(dateEl);

        headerDiv.appendChild(nameGroup);
        contentDiv.appendChild(headerDiv);

        // Regalos/Gustos (nuevo campo)
        if (birthday.gifts && typeof birthday.gifts === 'string' && birthday.gifts.trim() !== '') {
            const giftsDiv = document.createElement('div');
            giftsDiv.className = 'birthday-card__gifts';

            const giftsTitle = document.createElement('p');
            giftsTitle.className = 'birthday-card__gifts-title';
            giftsTitle.appendChild(createGiftIcon());
            giftsTitle.appendChild(document.createTextNode('Gustos y regalos'));
            giftsDiv.appendChild(giftsTitle);

            const giftsText = document.createElement('p');
            giftsText.className = 'birthday-card__gifts-text';
            giftsText.textContent = birthday.gifts;
            giftsDiv.appendChild(giftsText);

            contentDiv.appendChild(giftsDiv);
        }

        // Contador regresivo
        const countdownSection = document.createElement('div');
        countdownSection.className = 'birthday-card__countdown-section';

        const countdownLabel = document.createElement('p');
        countdownLabel.className = 'birthday-card__countdown-label';
        countdownLabel.appendChild(createCountdownIcon());
        countdownLabel.appendChild(document.createTextNode('Tiempo restante'));
        countdownSection.appendChild(countdownLabel);

        const countdownEl = document.createElement('div');
        countdownEl.className = 'birthday-card__countdown';
        countdownEl.textContent = getCountdownText(birthday.date);
        countdownSection.appendChild(countdownEl);

        contentDiv.appendChild(countdownSection);
        countdownElements.push({ element: countdownEl, date: birthday.date });

        // Nota opcional
        if (birthday.note && typeof birthday.note === 'string' && birthday.note.trim() !== '') {
            const noteEl = document.createElement('p');
            noteEl.className = 'birthday-card__note';
            noteEl.textContent = birthday.note;
            contentDiv.appendChild(noteEl);
        }

        card.appendChild(contentDiv);
        if (listElement) listElement.appendChild(card);
    });

    // Actualizar contadores cada segundo
    if (countdownElements.length > 0) {
        setInterval(() => {
            countdownElements.forEach(item => {
                item.element.textContent = getCountdownText(item.date);
            });
        }, 1000);
    }
}

/**
 * Muestra error en UI
 */
function showError(error) {
    const errorElement = document.getElementById('error-message');
    const listElement = document.getElementById('birthdays-list');
    if (listElement) listElement.textContent = '';
    if (errorElement) {
        const msg = error instanceof Error ? error.message : String(error);
        errorElement.textContent = `Error: ${msg}`;
        errorElement.style.display = 'block';
    }
    console.error('Error:', error);
}

/**
 * Inicialización
 */
async function init() {
    try {
        const birthdays = await loadBirthdays();
        renderBirthdays(birthdays);
    } catch (error) {
        showError(error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}