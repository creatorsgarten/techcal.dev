# 📅💻techcal.dev

Repo for techcal.dev if you want your country's version just do PR and modify template base on current version.

## Avaliable location

- 🇹🇭 Thailand https://th.techcal.dev
- 🇮🇩 Indonesia https://id.techcal.dev

## How to create your own location page

1. Fork this repo
2. Create new region by creating `.env.[region]` file at [`web/`](web/) (use template from [`.env.example](web/.env.example))
3. Open a pull request. I will add you to firebase project. and add auto deploy for your location

## How to run locally

1. Set up the prerequisites.

   - Option A: Install [Bun](https://bun.sh/).
   - Option B: Install [Devbox](https://www.jetpack.io/devbox) and run `devbox shell` in the project directory.

2. Install dependencies.

   ```sh
    bun i
   ```

3. Run the development server.

   ```sh
   cd web
   bun run dev
   ```

## How to update the design of Facebook image

1. Run the development server.

2. Go to <http://localhost:5173/> and pick an event. Copy the event ID from the URL.

3. Go to `http://localhost:5173/?capture=<event-id>` — Example: <http://localhost:5173/?capture=08c03gvh0uirbkdn9rat09tp6k>

4. Open Inspector and enable the device toolbar. Set the viewport to 1200x1200.

5. Go to More Tools > Rendering > Emulate CSS media feature prefers-color-scheme: light.
