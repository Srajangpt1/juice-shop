import { processInput } from './im';
import { exec } from 'child_process';

export function executeCommand() {
    // The sink where the tainted input is used in a dangerous operation
    const taintedInput = processInput();
    
    // Vulnerable sink: Using the untrusted input in command execution
    exec(taintedInput, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);
    });
}

// Run the function
executeCommand();
