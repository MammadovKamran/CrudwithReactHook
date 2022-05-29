import React, { useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [message, setMessage] = useState("");
  const [employee, setEmployee] = useState("");

  const isDisabled = [name, message, email, birth].every(Boolean);

  const url = "http://localhost:3000/users";

  useEffect(() => {
    handleFetchData().then((response)=>{
      if (response && response.length >0) {
        setEmployee(response)
      }
    });
  });

  const handleSubmit = (e) => {
    const user = { name, email, birth, message };
    handlePostData(user);
    e.preventDefault();
  };

  const handleFetchData = async () => {
    try {
      let request = await fetch(url);
      await request.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostData = async (paramsUser) => {
    if (paramsUser) {
      setEmployee((pre) => {
        let copy = [...pre];
        copy.push(paramsUser);
        return copy;
      });
      try {
        let request = await fetch(url, {
          method: "POST",
          body: JSON.stringify(paramsUser),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        return await request.json();
      } catch (error) {
        throw new Error(error);
      }
    }
  };
  return (
    <div className="w-100 mx-4">
      <Form className="w-50 mx-4" onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="please enter name" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="please enter email" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="name">Birthday</Label>
          <Input type="date" id="birthday" value={birth} onChange={(e) => setBirth(e.target.value)} placeholder="please enter birthday" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="name">Your Message</Label>
          <Input type="text" id="message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="please enter message" />
        </FormGroup>

        <FormGroup>
          <Button className="w-100" color="primary" type="submit" disabled={!isDisabled}>
            Add
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default App;
