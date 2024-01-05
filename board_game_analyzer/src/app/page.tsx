"use client"

import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [review, setReview] = useState(""); // State variable to store the Textarea value
  const [title, setTitle] = useState(""); // State variable to store the response
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  const handlePOST = () => {
    axios({
      method: 'post',
      url: 'http://10.22.65.109:8000/predict',
      data: {
        review: review // Use the state variable here
      }
    })
      .then(function (response) {
        // Handle the successful response he

        // Store the response in the state

        const title = response.data.split(/(http\S+)/);
        const link = title[1].split(';')
        const desc = response.data.split(';')
        const descFinal = desc[1].split('/[$%&^#*@]/')
        // setResponse(response.data);

        setTitle(title[0])
        setLink(link[0])
        setDescription(descFinal[0])       
      })
      .catch(function (error) {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
  }

  const handleTextareaChange = (e:any) => {
    setReview(e.target.value); // Update the state when the Textarea value changes
  }

  // Use useEffect to update the input when the response changes
  useEffect(() => {
    setTitle(title)
    setLink(link)
    setDescription(description)    
  }, [title, link, description]);

  return (
    <div className="flex flex-col justify-center items-center w-scren h-screen">
      <Navbar isBordered>
        <NavbarBrand>
          <p className="font-bold text-inherit">BGA</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Ask me anything about board games
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Hello, Player</Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="w-full flex justify- items-center flex-col h-full">
        <Textarea
          label="Description"
          labelPlacement="outside"
          placeholder="Enter your description"
          size="lg"
          className="max-w-xs mt-6"
          value={review} // Bind the value to the state
          onChange={handleTextareaChange} // Attach the onChange handler
        />

        <Button color="primary" className="w-1/5 mt-6" onClick={handlePOST}>
          Check Board Game
        </Button>

        <Input
          isReadOnly
          type="email"
          defaultValue={title} // Bind the response state to the input
          className="max-w-xs mt-6"
        />

        <Textarea
          isReadOnly
          type="email"
          defaultValue={description} // Bind the response state to the input
          className="max-w-xs mt-6"
        />
        
      </div>
    </div>
  );
}
