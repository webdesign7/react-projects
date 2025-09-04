'use client'

import classes from './image-picker.module.css';
import {useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker({label, name}) {

    const [pickedImage, setPickedImage] = useState(null);

    const imageInputRef = useRef();

    function handlePickClick() {
        imageInputRef.current.click();
    }

    function handleImagePicked(event) {
        const file = event.target.files[0];
        if (!file) {
            setPickedImage(null);
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };
        
        fileReader.readAsDataURL(file);
    }

    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image selected</p>}
                    {pickedImage && <Image src={pickedImage} fill alt={label} />}
                </div>

                <input
                    className={classes.input}
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg"
                    ref={imageInputRef}
                    onChange={handleImagePicked}
                    required
                    name={name} />
                <button
                    type="button"
                    onClick={handlePickClick}
                    className={classes.button}>
                    Pick an image
                </button>
            </div>
        </div>
    );
}