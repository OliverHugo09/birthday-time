// js/countdown.js
/**
 * Lógica de cálculo y formateo de contadores regresivos para cumpleaños
 * Cumple con US-03, US-04, RF-03, RF-04, RN-01, RNF-02
 */

/**
 * Calcula la fecha del próximo cumpleaños basado en fecha MM-DD
 * Cumple con RN-01: Si ya pasó este año, usar año siguiente. Si es hoy o futuro, usar año actual.
 * @param {string} dateMMDD - Fecha en formato MM-DD
 * @param {Date} [now=new Date()] - Fecha actual para cálculos (útil para pruebas)
 * @returns {Date|null} Fecha del próximo cumpleaños o null si fecha inválida
 */
function getNextBirthdayDate(dateMMDD, now = new Date()) {
    if (typeof dateMMDD !== 'string') {
        return null;
    }
    
    /**
     * Validación de formato MM-DD
     */
    const match = dateMMDD.match(/^(\d{2})-(\d{2})$/);
    if (!match) {
        return null;
    }
    
    const month = parseInt(match[1], 10);
    const day = parseInt(match[2], 10);
    
    /**
     * Validación básica de rango
     */
    if (month < 1 || month > 12 || day < 1 || day > 31) {
        return null;
    }
    
    const currentYear = now.getFullYear();
    
    /**
     * Crear fecha para este año
     */
    const birthdayThisYear = new Date(currentYear, month - 1, day);
    
    /**
     * Validar que la fecha sea válida (ej. 02-30)
     */
    if (
        birthdayThisYear.getFullYear() !== currentYear ||
        birthdayThisYear.getMonth() !== month - 1 ||
        birthdayThisYear.getDate() !== day
    ) {
        return null;
    }
    
    /**
     * Si ya pasó este año (o es hoy), usar año siguiente
     * Comparación a nivel de día para considerar "hoy"
     */
    const todayStart = new Date(currentYear, now.getMonth(), now.getDate());
    const birthdayThisYearStart = new Date(currentYear, month - 1, day);
    
    if (birthdayThisYearStart < todayStart) {
        /**
         * Ya pasó este año, usar año siguiente
         */
        return new Date(currentYear + 1, month - 1, day);
    }
    
    /**
     * Es hoy o futuro en año actual
     */
    return birthdayThisYearStart;
}

/**
 * Calcula la diferencia de tiempo entre ahora y fecha objetivo
 * @param {Date} targetDate - Fecha objetivo
 * @param {Date} [now=new Date()] - Fecha actual
 * @returns {{days: number, hours: number, minutes: number, seconds: number, totalMs: number}} Objeto con diferencia
 */
function calculateTimeDiff(targetDate, now = new Date()) {
    if (!(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalMs: 0
        };
    }
    
    const totalMs = targetDate.getTime() - now.getTime();
    
    /**
     * Si ya pasó o es exactamente ahora
     */
    if (totalMs <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            totalMs: 0
        };
    }
    
    /**
     * Cálculo de unidades
     */
    const seconds = Math.floor((totalMs / 1000) % 60);
    const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
    const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    
    return {
        days,
        hours,
        minutes,
        seconds,
        totalMs
    };
}

/**
 * Formatea la diferencia de tiempo a string legible
 * Cumple con RF-04: DD días HH horas MM minutos SS segundos
 * @param {{days: number, hours: number, minutes: number, seconds: number}} timeDiff
 * @returns {string} String formateado
 */
function formatTimeDiff(timeDiff) {
    const days = timeDiff.days || 0;
    const hours = String(timeDiff.hours || 0).padStart(2, '0');
    const minutes = String(timeDiff.minutes || 0).padStart(2, '0');
    const seconds = String(timeDiff.seconds || 0).padStart(2, '0');
    
    /**
     * Si es hoy (0 días)
     */
    if (days === 0 && timeDiff.totalMs === 0) {
        return '0 días 00 horas 00 minutos 00 segundos';
    }
    
    return `${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`;
}

/**
 * Obtiene el texto del contador para una fecha de cumpleaños
 * @param {string} dateMMDD - Fecha en formato MM-DD
 * @param {Date} [now=new Date()] - Fecha actual
 * @returns {string} Texto formateado del contador
 */
function getCountdownText(dateMMDD, now = new Date()) {
    const nextDate = getNextBirthdayDate(dateMMDD, now);
    
    if (!nextDate) {
        return 'Fecha inválida';
    }
    
    const timeDiff = calculateTimeDiff(nextDate, now);
    
    /**
     * Si es hoy
     */
    if (timeDiff.totalMs === 0) {
        const match = dateMMDD.match(/^(\d{2})-(\d{2})$/);
        if (match) {
            const month = parseInt(match[1], 10);
            const day = parseInt(match[2], 10);
            const currentYear = now.getFullYear();
            const birthdayToday = new Date(currentYear, month - 1, day);
            const todayStart = new Date(currentYear, now.getMonth(), now.getDate());
            const birthdayTodayStart = new Date(currentYear, month - 1, day);
            
            if (birthdayTodayStart.getTime() === todayStart.getTime()) {
                return '¡Hoy es su cumpleaños!';
            }
        }
        return '0 días 00 horas 00 minutos 00 segundos';
    }
    
    return formatTimeDiff(timeDiff);
}

/**
 * Exporta funciones para uso en otros módulos
 */
export {
    getNextBirthdayDate,
    calculateTimeDiff,
    formatTimeDiff,
    getCountdownText
};
