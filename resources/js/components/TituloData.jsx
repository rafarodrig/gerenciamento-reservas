
export default function TituloData({titulo, data}){
    return (
        <>
        <div className="mt-0 fs-3 d-flex justify-content justify-content-between">
        <h1 className="h3">{titulo}</h1>
        <h1 className="h3">{data}</h1>
        </div>
        </>
    )
}