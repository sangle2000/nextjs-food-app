"use client";

import classes from './image-picker.module.css'
import {useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker({label, name}: {label: string, name: string}) {
    const [pickedImage, setPickedImage] = useState<string | null | ArrayBuffer>(null);

    const imageInputRef = useRef<HTMLInputElement>(null);

    const handlePickClick = () => {
        imageInputRef.current!.click();
    }

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor="image">{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {
                        pickedImage ? <Image src={pickedImage.toString()} alt="Preview Image" fill/> : <p>No image picked yet!</p>
                    }

                </div>
                <input
                    ref={imageInputRef}
                    className={classes.input}
                    type="file"
                    id="image"
                    accept="image/ong, image/jpeg"
                    name={name}
                    onChange={handleImageChange}
                    required
                />
                <button className={classes.button} type="button" onClick={handlePickClick}>Pick an Image</button>
            </div>
        </div>
    )
}