interface Props {
    width?: string | number
    src: string
    alt: string
}
export const DisplayPicture = ({ width, src, alt }: Props) => {
    return <img className={`h-auto rounded-full border w-${width}`} src={src} alt={alt}/>
}