"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useFormState, useFormStatus } from 'react-dom'
import { addProduct } from '../../_actions/product'
import { Product } from '@prisma/client'
import Image from 'next/image'

const ProductForm = ({product}: {product?: Product | null}) => {
    const [error, action] = useFormState(addProduct, {});
  const [price, setPrice] = useState<number | undefined>(product?.price);

  return (
    <form action={action} className='space-y-8'>
        <div className='space-y-2'>
            <Label htmlFor='name'>Name</Label>
            <Input type="text" id="name" name="name" defaultValue={product?.name || ''} required />
            {error.name && <div className="text-destructive">{error.name}</div>}
        </div>
        <div className='space-y-2'>
            <Label htmlFor='price'>Price</Label>
            <Input type="number" id="price" name="price" value={price} onChange={(e: any) => setPrice(Number(e.target.value) || undefined)} required />
            {error.price && <div className="text-destructive">{error.price}</div>}
        </div>
        <div className='space-y-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea name="description" id='description' defaultValue={product?.description || ''} required />
            {error.description && <div className="text-destructive">{error.description}</div>}
        </div>
        <div className='space-y-2'>
            <Label htmlFor='file'>File</Label>
            <Input type="file" id="file" name="file" required={product == null} />
            {product != null && (<div className="text-muted-foreground">{product.filePath}</div>)}
            {error.file && <div className="text-destructive">{error.file}</div>}
        </div>
        <div className='space-y-2'>
            <Label htmlFor='image'>Image</Label>
            <Input type="file" id="image" name="image" required={product == null} />
            {product != null && (<Image src={product.imagePath} width="400" height={400} alt="Product Image" />)}
            {error.image && <div className="text-destructive">{error.image}</div>}
        </div>
        <SubmitButton/>
    </form>
  )
}

const SubmitButton = () => {
    const {pending} = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
  )
}
export default ProductForm