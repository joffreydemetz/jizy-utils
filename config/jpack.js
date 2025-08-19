const jPackData = {
    name: 'jUtils',
    alias: 'jizy-utils',
    cfg: 'utils',
    assetsPath: 'dist',

    buildTarget: null,
    buildZip: false,
    buildName: 'default',

    onCheckConfig: () => { },

    onGenerateBuildJs: (code) => code,

    onGenerateWrappedJs: (wrapped) => wrapped,

    onPacked: () => { }
};

export default jPackData;