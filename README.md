# MeetAI

MeetAI is a SaaS AI platform that allows users to create **custom agents with personalized context** and then host **live meetings** with them. After the meeting, users can continue the conversation using AI chat.

Powered by **OpenAI**, **Stream Video**, and **Stream Chat**, MeetAI provides a seamless meeting and post-meeting experience with AI-driven agents.

It includes **paid subscription plans** via [polar.sh](https://polar.sh), **authentication and payment integration** with [better-auth](https://better-auth), and a modern, scalable backend powered by **drizzle-orm** with **Neon Database**.

---

## Features

* **Custom AI Agents** – Create agents with unique context tailored to your needs.
* **AI-Powered Meetings** – Join video calls with your AI agent using **Stream Video**.
* **Post-Meeting Chat** – Continue conversations with your agent after meetings using **Stream Chat** and OpenAI (GPT-4o).
* **Subscriptions & Payments** – Paid plans integrated via **polar.sh**.
* **Authentication & Billing** – Secure auth and payment workflows with **better-auth**.
* **Modern UI** – Built with **shadcn/ui** for a clean, accessible design.
* **Scalable Backend** – Database powered by **drizzle-orm** with **Neon** for serverless, production-ready PostgreSQL.

---

## Getting Started

First, install the dependencies

```bash
npm i --legacy-peer-deps
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see MeetAI running locally.

---

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org) (App Router)
* **UI:** [shadcn/ui](https://ui.shadcn.com) + [TailwindCSS](https://tailwindcss.com)
* **AI & Meetings:** [OpenAI](https://openai.com), [Stream Video](https://getstream.io/video), [Stream Chat](https://getstream.io/chat)
* **Auth & Payments:** [better-auth](https://better-auth) + [polar.sh](https://polar.sh)
* **Database & ORM:** [Neon](https://neon.tech) + [drizzle-orm](https://orm.drizzle.team)
* **State & Data:** [TanStack Query](https://tanstack.com/query) (server/client data hydration)

---

## Learn More

* [Next.js Documentation](https://nextjs.org/docs) – explore Next.js features.
* [Stream Documentation](https://getstream.io/docs) – learn about video and chat APIs.
* [polar.sh Documentation](https://docs.polar.sh) – manage subscriptions & payments.
* [drizzle-orm Docs](https://orm.drizzle.team) – query builder & migrations.


## 🚢 Deployment

The easiest way to deploy MeetAI is on the [Vercel Platform](https://vercel.com), creators of Next.js.

For database, use [Neon](https://neon.tech) for a scalable PostgreSQL setup.

Check out the [Next.js deployment guide](https://nextjs.org/docs/app/building-your-application/deploying) for more info.
