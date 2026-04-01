# NexaAuth Frontend SPA

Interface client (Single Page Application) pour NexaAuth, une solution d’authentification moderne destinée aux PME.

Cette application consomme une API Laravel sécurisée (Sanctum/JWT) et implémente :
- Authentification classique (email/mot de passe)
- Authentification sociale (OAuth2 : Google + GitHub)
- Gestion complète du profil utilisateur



---

## 🚀 Stack Technique

### Frontend
- **Framework : React.js**
- **Routing : React Router**
- **State Management : Context API / Redux Toolkit**
- **HTTP Client : Axios**
- **UI : TailwindCSS / Material UI**

### Backend (fourni)
- Laravel API REST
- Auth via token (Sanctum ou JWT)
- OAuth via Laravel Socialite

---

## 🤔 Pourquoi React ?

React a été choisi pour :
- Sa flexibilité et son écosystème riche
- Sa gestion simple des SPA
- Sa large adoption en entreprise
- Sa compatibilité idéale avec les APIs REST

---

## 📦 Installation

```bash
git clone https://github.com/your-repo/authentification-frontend-API.git
cd authentification-frontend-API
npm install
npm run dev
npm install axios
npm install react-router-dom
nom start