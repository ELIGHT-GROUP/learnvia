const { exec } = require('child_process');
const path = require('path');

const projects = [
    { name: 'backend', path: path.resolve(__dirname, '..', 'backend') },
    { name: 'admin', path: path.resolve(__dirname, '..', 'admin') },
    { name: 'web', path: path.resolve(__dirname, '..', 'web') }
];

console.log('Starting development servers...');

projects.forEach(project => {
    console.log(`Starting ${project.name} in a new window...`);
    // Using 'start' command on Windows to open a new command prompt window for each service.
    // The '/k' flag keeps the new window open after the command finishes.
    const command = `start "${project.name}" cmd /k "cd /d ${project.path} && npm install && npm run dev"`;

    exec(command, (error) => {
        if (error) {
            console.error(`Failed to start ${project.name}: ${error.message}`);
        }
    });
});

console.log('All development servers are being started in separate windows.');
