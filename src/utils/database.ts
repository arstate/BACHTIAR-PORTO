export type DatabaseSchema = {
    [categoryFolder: string]: {
        [fileName: string]: string[];
    };
};

export const getDatabase = (): DatabaseSchema => {
    const db: DatabaseSchema = {};

    // import.meta.glob allows importing raw file contents from the filesystem in Vite
    const modules = import.meta.glob('/src/database/**/*.txt', { query: '?raw', import: 'default', eager: true });

    for (const path in modules) {
        const parts = path.split('/');
        const fileNameWithExt = parts.pop() || '';
        const categoryFolder = parts.pop() || '';
        const fileName = fileNameWithExt.replace('.txt', '');

        if (!db[categoryFolder]) {
            db[categoryFolder] = {};
        }

        const rawText = modules[path] as string;

        // Split text by newlines and filter out empty lines or comments
        const lines = rawText
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0 && !line.startsWith('//'));

        // Convert keys to lowercase to be safe
        db[categoryFolder][fileName.toLowerCase()] = lines;
    }

    return db;
};
