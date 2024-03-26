# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:



Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

---

[Intenationalization i18n](https://docs.astro.build/en/guides/internationalization/)

[Add i18n features](https://docs.astro.build/en/recipes/i18n/#recipe)

[Error reference](https://docs.astro.build/en/reference/error-reference/)

[Keystatic & Astro](https://docs.astro.build/en/guides/cms/keystatic/#displaying-a-collection-list)

[Adding Keystatic to an Astro project](https://keystatic.com/docs/installation-astro)

[Markdoc](https://markdoc.dev/)

---

------------------------------------------------------------

```txt
Astro Content Collection:

src/content/config.ts
src/content/posts/*.md
src/pages/blog.astro
src/pages/posts/[...slug].astro

src/
├── content/
│    ├───── config.ts
│    └───── posts/
│           └── *.md
└── pages/
    ├────── blog.astro
    └────── posts/
            └── [...slug].astro
```

```jsx
---
// src/pages/blog.astro
import { getCollection } from "astro:content";

import BaseLayout from "../layouts/BaseLayout.astro";
import BlogPost from "../components/BlogPost.astro";
const pageTitle = "My Astro Learning Blog";
const allPosts = await getCollection("posts");
---

<BaseLayout pageTitle={pageTitle}>
  <p>This is where I will post about my journey learning Astro.</p>
  <ul>
    {
      allPosts.map((post) => (
        <BlogPost url={`/posts/${post.slug}/`} title={post.data.title} />
      ))
    }
  </ul>
</BaseLayout>
```

```jsx
---
// src/pages/posts/[...slug].astro
import { getCollection } from "astro:content";
import MarkdownPostLayout from "../../layouts/MarkdownPostLayout.astro";

export async function getStaticPaths() {
  const blogEntries = await getCollection("posts");
  return blogEntries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<MarkdownPostLayout frontmatter={entry.data}>
  <Content />
</MarkdownPostLayout>
```

```ts
// src/content/config.ts

// Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";
// Define a `type` and `schema` for each collection
const postsCollection = defineCollection({
    type: 'content',
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),
      image: z.object({
        url: z.string(),
        alt: z.string()
      }),
      tags: z.array(z.string())
    })
});
// Export a single `collections` object to register your collection(s)
export const collections = {
  posts: postsCollection,
};
```

```jsx
---
// "../layouts/BaseLayout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import "../styles/global.css";
const { pageTitle } = Astro.props;
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <title>{pageTitle}</title>
  </head>
  <body>
    <Header />
    <h1>{pageTitle}</h1>
    <slot />
    <Footer />
    <script>
      import "../scripts/menu.js";
    </script>
  </body>
</html>
```

```jsx
---
// "../components/BlogPost.astro";
const { title, url } = Astro.props
---
<li><a href={url}>{title}</a></li>
```

```jsx
---
// "../../layouts/MarkdownPostLayout.astro";
import BaseLayout from "./BaseLayout.astro";
const { frontmatter } = Astro.props;
---

<BaseLayout pageTitle={frontmatter.title}>
  <p>{frontmatter.pubDate.toString().slice(0, 10)}</p>
  <p><em>{frontmatter.description}</em></p>
  <p>Written by: {frontmatter.author}</p>
  <img src={frontmatter.image.url} width="300" alt={frontmatter.image.alt} />
  <slot />
</BaseLayout>
```

------------------------------------------------------------