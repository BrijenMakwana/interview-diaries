"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

const Newsletter = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false);

  const addToNewsletter = () => {
    setIsSubscribing(true);

    const url = "https://ihnvcp1wr7.us.aircode.run/beehiiv";

    const data = {
      email: email,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("POST request successful");
        console.log("Response:", data);
      })
      .catch((error) => {})
      .finally(() => {
        setEmail("");
        setIsSubscribing(false);
      });
  };

  return (
    <>
      <SectionHeading text="subscribe to our" highlightedText="newsletter" />
      <section className="flex flex-row gap-5 flex-wrap items-center justify-center w-full">
        <Input
          type="email"
          label="Email"
          placeholder="Your email address"
          className="w-[300px]"
          isRequired
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <Button
          color="primary"
          isDisabled={!email}
          onClick={addToNewsletter}
          isLoading={isSubscribing}
        >
          Subscribe
        </Button>
      </section>
    </>
  );
};

export default Newsletter;
