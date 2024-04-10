declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TEMPLATE_DIR: string
        }
    }
}
