import { LOGS_LVL_REPORT } from '@env';

const LOG_LVLS = {
    INFO: 1,
    WARNING: 2,
    ERROR: 3,
}

export const infoLogger = (action, data) => {
    if (LOGS_LVL_REPORT >= LOG_LVLS.INFO)
        __logMessage(LOG_LVLS.INFO, action, data);
}

export const warningLogger = (action, data) => {
    if (LOGS_LVL_REPORT >= LOG_LVLS.WARNING)
        __logMessage(LOG_LVLS.WARNING, action, data);
}

export const errorLogger = (action, data) => {
    console.log({ LOGS_LVL_REPORT });

    if (LOGS_LVL_REPORT >= LOG_LVLS.ERROR)
        __logMessage(LOG_LVLS.ERROR, action, data);
}

const __logMessage = (logLvl, action, data) => {
    console.group();
    console.log(`action:${action}`);
    switch (logLvl) {
        case LOG_LVLS.ERROR:
            console.error(data);
            break;
        case LOG_LVLS.WARNING:
            console.warn(data);
            break;
        default:
            console.info(data);
    }
    console.groupEnd();
}


