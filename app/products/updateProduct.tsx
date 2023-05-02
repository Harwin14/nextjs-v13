'use client' //directtive jd client-component bukan server component
import { SyntheticEvent, useState } from "react"
import { useRouter } from "next/navigation"

type Product = {
    id: number;
    title: string;
    price: number;
}
export default function UpdateProduct(product: Product) {
    const [title, setTitle] = useState(product.title)
    const [price, setPrice] = useState(product.price)
    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] = useState(false)

    const router = useRouter()

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault()
        setIsMutating(true)
        await fetch(`http://localhost:5000/products/${product.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                price
            })
        })
        setIsMutating(false)
        router.refresh()
        setModal(false)
    }
    function handleChange() {
        setModal(!modal)
    }

    return (
        <div>

            <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit <span className=" text-green-900 text-2xl">{product.title}</span></h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Title</label>
                            <input
                                type="text"
                                className="input w-full input-bordered"
                                placeholder="Product Name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Price</label>
                            <input
                                type="text"
                                className="input w-full input-bordered"
                                placeholder="Price"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn btn-warning" onClick={handleChange}>Close</button>
                            {!isMutating ?
                                (<button type="submit" className="btn btn-primary">Update</button>)
                            :
                                (<button type="button" className="btn loading">Updating...</button>)
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

