# OneTapGOV → Team HackInnova

## Track(Vertical AI and Create any idea

**AI-Powered Government Scheme Discovery & Application Assistant**

**Built for NamasteDev Hackathon X Codex**

## Overview

Every year, governments launch thousands of welfare schemes to improve the lives of citizens. However, millions of eligible people never receive these benefits—not because they are ineligible, but because discovering the right scheme is difficult. Information is fragmented across departments, eligibility rules are complex, application processes are confusing, and language barriers further reduce accessibility.

OneTapGOV addresses this challenge with an AI-powered conversational assistant that transforms the entire government scheme discovery experience into a simple conversation. Instead of searching across multiple websites or reading lengthy documents, users simply chat with the assistant in natural language. The assistant builds their profile, determines eligibility across government schemes, explains why they qualify, provides the required documents, and redirects them directly to the official application portal.

The objective is simple: **ensure that every eligible citizen is aware of and can easily access the benefits they deserve.**

## Problem Statement

Despite India's extensive welfare ecosystem, citizens continue to face several challenges:

- Government scheme information is distributed across numerous departments and portals.
- Eligibility criteria are often difficult to understand.
- Citizens are unaware of schemes relevant to their personal circumstances.
- Application processes require significant manual effort.
- Language barriers reduce accessibility for non-English speakers.
- Many beneficiaries miss opportunities simply because they never discover the schemes available to them.

## Solution

OneTapGOV leverages OpenAI's language models to create an intelligent assistant capable of understanding citizens through natural conversation.

Rather than asking users to browse hundreds of schemes, the assistant progressively gathers their information, securely stores their profile, evaluates eligibility using a rule-based matching engine, and presents personalized recommendations in clear, human-friendly language.

For every recommended scheme, users receive:

- A simple explanation of why they qualify.
- The eligibility criteria.
- A checklist of required documents.
- A direct link to the official government application portal.

This significantly reduces the effort required to discover and apply for welfare schemes while maintaining trust by directing users only to official government resources.

## Key Features

- AI-powered conversational assistant
- Natural language profile building
- Intelligent eligibility matching engine
- Personalized government scheme recommendations
- Plain-language eligibility explanations
- Required document checklist for every scheme
- Direct redirection to official government portals
- Secure authentication and profile management
- Clean and intuitive dashboard
- Multilingual text-based conversations
- English voice interaction support

## Multilingual Accessibility

Accessibility is a core principle of OneTapGOV.

Users can interact with the assistant in multiple Indian languages through text, enabling a significantly broader audience to discover government schemes without language becoming a barrier.

Voice interaction is currently supported in English through Chrome's Speech Recognition API. This limitation is browser-specific rather than application-specific. In a production deployment, multilingual speech recognition services can enable seamless voice conversations across Indian languages.

## System Architecture

```
Citizen
    │
    ▼
Next.js Frontend
    │
    ▼
FastAPI Backend
    │
    ▼
OpenAI API
    │
    ▼
Eligibility Engine
    │
    ├──────── Government Scheme Database
    │
    └──────── Supabase
    │
    ▼
Personalized Recommendations
```

## Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | Next.js, React |
| Backend | FastAPI |
| AI | OpenAI API |
| Database | Supabase |
| Authentication | Supabase Auth |
| Deployment | Vercel |

## How It Works

1. The user securely signs into OneTapGOV.
2. The AI assistant gathers citizen information through a natural conversation.
3. User information is securely stored within the application.
4. The eligibility engine evaluates applicable government welfare schemes.
5. Personalized recommendations are generated based on the user's profile.
6. The assistant explains each recommendation, lists the required documents, and provides an official government application link.


## Demo

**Live Application**: https://one-tap-gov.vercel.app/

**Pitch Deck**: https://drive.google.com/file/d/1nL0D2uu1Cg2-g8lIOVj-ZdtJ4KHQdQsT/view

**Demo Video**: https://drive.google.com/file/d/1qWcfSXat7KL_M0C2DAjKSsZsUQQfWOuc/view

## Team Members:
- [Suzanne Daniel Thomas](https://github.com/suzannet-menon)
- [Himani Bagale](https://github.com/Himani78116)
- [Ruchira Rajesh Jagshettiwar](https://github.com/ruchirajags)
