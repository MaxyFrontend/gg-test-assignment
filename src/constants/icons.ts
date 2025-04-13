type SVGModule = {
    default: string
}
const iconsMap = import.meta.glob<SVGModule>('@/assets/icons/*.svg', {
    eager: true,
    query: '?raw'
})

export default iconsMap
