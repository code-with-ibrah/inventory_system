import ReactDom from 'react-dom'

export default function PopUps ({ children }: { children: any}) {
  return ReactDom.createPortal(
    children,
    document.getElementById('portal')!
  )
}
