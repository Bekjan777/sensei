"use client"
import Image from "next/image";
import photo from "./public/GLASSRS.png"
import { Switch } from "@/components/ui/switch"



import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {useState} from "react";
import {Label} from "@/components/ui/label";

import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import SubscriptionBasic from "@/components/pages/subscriptionBasic";
import SubscriptionPremium from "@/components/pages/subscriptionPremium";


const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(255),
  phone: z.string().min(2).max(255),
  date: z.date({
    required_error: "A date of birth is required."}),

})

const token = "7153702905:AAEd9TfQEo9Kxa3pRBvBvGMwImQcwFku-Gs"
const URL_API = `https://api.telegram.org/bot${token}/sendMessage`
const chatId = "@test_bot_beka"


export default function Home() {
  const { setValue } = useForm();
  const [open, setOpen] = useState(true)
  const [num, setNum] = useState(0)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "", email: "", phone: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Подготовка текста для отправки
      const text = `Name: ${values.username}\nPhone: ${values.phone}\nEmail: ${values.email}\nDate: ${values.date}`;

      // Отправка данных через fetch
      const response = await fetch(URL_API, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при отправке данных в Telegram");
      }

      // Очистка полей формы
      setValue("username", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("date", null); // Устанавливаем null для очистки даты
      setOpen(false);

    } catch (error) {
      console.error("Ошибка:", error);
    }
  };
  const [yearly, setYearly] = useState(true)
  return (

  <>
    <section className="container py-20 relative">
      <div className="">
        <div className="flex flex-col sm:justify-between gap-10 sm:flex-row">
          <div className="sm:w-1/3 flex flex-col gap-5">
            <h1 className="font-bold text-5xl xl:text-3xl ">
              SenseiVision
            </h1>
            <h2 className="font-semibold text-2xl md:text-xl ">
              Glasses aimed on developing techno
            </h2>
            <p>
              <i className="md:text-[14px]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam necessitatibus perspiciatis quod
                repellendus. Earum libero natus nihil odio tenetur. Minima?
              </i>
            </p>
            <div className="flex flex-col gap-5 lg:flex-row-reverse">
              <div className="flex items-center gap-2 basis-2 flex-shrink-0 lg:basis-32">
                <Button className="" onClick={() => num > 0 && setNum(prev => prev - 1)} type="button">-</Button>
                <p className="flex-shrink-0 basis-8 flex-grow-0 text-2xl flex justify-center">{num}</p>
                <Button className="" onClick={() => num < 99 && setNum(prev => prev + 1)} type="button">+</Button>
              </div>
              <Button className="w-full" onClick={() => setOpen(prev => !prev)}>Сделать Заказ</Button>
            </div>
          </div>
          <div className="sm:hidden w-full h-[1px] bg-black opacity-40 mt-5"></div>
          <div className="w-full sm:w-1/2">
            <img
              className="w-[100%] object-cover object-center"
              src="https://www.onlygfx.com/wp-content/uploads/2021/08/reading-glasses-silhouette-frame-2093.png"
              alt="io"
              // layout="responsive"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex w-full justify-center items-center my-5">
            <Switch checked={yearly} onCheckedChange={() => {setYearly(prev => !prev)}}/>
            <span className="">Yearly</span>
          </div>
          <div className="flex justify-center gap-10">
            <SubscriptionBasic price={yearly ? 500 : 50}/>
            <SubscriptionPremium price={yearly ? 1000 : 100}/>
          </div>
        </div>
      </div>
    </section>
    {!open && (
      <div onClick={() => setOpen((prev) => !prev)} className="backdrop-blur fixed top-0 w-screen h-screen flex justify-center items-center">
        <div onClick={(e) => e.stopPropagation()} className="p-5 bg-white shadow-2xl relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="username">Name</Label>
                        <Input type="text" id="username" placeholder="Name" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" placeholder="Email" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="phone">Phone</Label>
                        <Input type="tel" id="phone" placeholder="+996-123-45-67" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <FormLabel>Date of birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant={"outline"} className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    )}
  </>
  );
}
