import { Card, CardFooter, Image, Button } from "@nextui-org/react";

const FeaturedDev = () => {
  return (
    <Card isFooterBlurred radius="lg" className="border-none">
      <Image
        alt="dev"
        className="object-cover"
        height={200}
        src="https://lh3.googleusercontent.com/pw/ADCreHddCUFEeusZ46IQIx7l2zwSm0IM2u24M9k_EADTjozgEzqrUYHPgerVE9LPd9n8kld-JmXpvUw67o35HfpXX9vnStKl27GayLRF5TCyaAkcRnpYCpcpm24vUoxzIeKSZs5DNsGkVCviAMA3QPXwohGnTyEhFT4P_gkat0JQRgfxePon3wIk-wFrBzD7-c1WiXNGPW1k56f8f7iiT3sH4XEPXbYY4VjKrz13CWIXjnzggI-DIT_Xk6rhLM_XPBS7Lz5y35JrnRXMKZxCIwDyzYO7TQ42wasQ1CVt9I_EnV0qMmXS23HPOavQ9qDEL1Ou1gi5gky45xcwuT7Bc39K4L4CFejcxvNbYSAmLofKz9fQNYdwsPz5bEgFYJKkkrc4eB46oDA0gEFUqHTjxYPg6_vIcqUl-CtOS9DVFYNKCWl4IQnGkfBvmY3_TeMiR0TkilPRh0KRDLJYaEJBgFMZnPYRqeYro4O5ki2KDEl4qoQRumMSCEfjXYY7iZHIaz1oEstBACmspxBlb3flcZAcashF0T52TnxYYdM4q3i75pmsFXUu-dtGV4HR-5EkVg9gaXxL-c2RHkHcJXqkGlQMaSpd71a_2Uq3QRMpa_CNz3e-3iL1p4MYVlY-8vwrJkjqHql2Nat1yvjAbINdAzxkjrHRUZvsk_ScT7jBKl0CjXKxmRHrcyI-ekt3GTmF46ndRCVQ8wEFpReMOM8msyPoktu4904ZUA9HCOnMAvDXeoKK5t9quPXXUdBGbV0almP8GIxQq0Dv0fsxi9iUKuAiiEJEPareAUqBnod1kRYmtv6T7JaYWbAtOG_8kRUvhCTHsMq4ExS97TZYwwQy96fGH9_1apY6LXyVlHWJYR07N75NnsEX6SLoWbST4sq2pXYDdqh6OkoS4YSSIDt7lZ8VVwA=w662-h881-s-no-gm?authuser=0"
        width={200}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">Brijen Makwana</p>
        <Button
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
        >
          Visit Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeaturedDev;
