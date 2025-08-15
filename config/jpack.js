import fs from 'fs';
import path from 'path';
import {
    jPackConfig,
    LogMe
} from "../jpack/utils.js";

const currentPath = path.dirname(import.meta.url);

jPackConfig.init({
    name: 'jUtils',
    alias: 'jizy-utils',
    cfg: 'utils',
    assetsPath: 'dist',
    checkConfig: (config) => {
        return config;
    },
    genBuildJs: (code, config) => {
        return code;
    },
    onPacked: (config) => {
        const target = jPackConfig.get('assetsPath');

        // move the .min.js file in dist/js/ to dist/
        LogMe.log('Move minified JS file to dist root');
        const minJsFile = path.join(target, 'js', `${jPackConfig.get('alias')}.min.js`);
        if (fs.existsSync(minJsFile)) {
            fs.renameSync(minJsFile, path.join(target, `${jPackConfig.get('alias')}.min.js`));
        }
    }
});
