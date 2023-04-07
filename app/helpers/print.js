import chalk from 'chalk';

class type {
    static INFORMATION = "INFORMATION"
    static ERROR = "ERROR"
    static SUCCESS = "SUCCESS"
    static WARNING = "WARNING"
}

function print(message, outputType) {
    switch (outputType) {
        case type.ERROR:
            console.log(chalk.red(message));
            break;
        case type.SUCCESS:
            console.log(chalk.green(message));
            break;
        case type.WARNING:
            console.log(chalk.yellow(message));
            break;
        default:
            console.log(chalk.white(message));
            break;
    }
}

export { print, type }