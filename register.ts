require("ts-node").register({
    transpileOnly: true,
    typeCheck: false,
    compilerOptions: {
        module: "ESNext",
        target: "ESNext",
        esModuleInterop: true,
    },
});
