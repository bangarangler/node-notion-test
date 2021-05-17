require("dotenv").config();
const { Client } = require("@notionhq/client");

// console.log("NK", process.env.NOTION_KEY);
const notion = new Client({
  auth: process.env.NOTION_KEY,
});

async function main() {
  // const users = await notion.users.list();
  // console.log("users", users);
  // await notion.pages.create({
  //   parent: { database_id: process.env.NOTION_DB },
  //   properties: {
  //     Name: {
  //       title: [
  //         {
  //           text: {
  //             content: "YOOOO",
  //           },
  //         },
  //       ],
  //     },
  //     Email: {
  //       email: "ryan.agaain@test.com",
  //     },
  //     Phone: {
  //       phone_number: "123-90-6789",
  //     },
  //     URL: {
  //       url: "https://yahoo.com",
  //     },
  //     "Check This": {
  //       checkbox: false,
  //     },
  //   },
  // });

  const dbs = await getDbs();
  // console.log("db", dbs);
  const pageIds = [];
  for (let i = 0; i < dbs.results.length; i++) {
    // console.log("i", dbs.results[i]);
    if (dbs.results[i].object === "page") {
      pageIds.push(dbs.results[i].id);
    }
  }
  // console.log("pageIds", pageIds);
  try {
    const data = await getPages(pageIds);
    // if (data) {
    //   console.log("data where we want it", data);
    // }
    console.log("data where we dont want it", data);
  } catch (err) {
    console.log("err", err);
  }
  // const res = await notion.databases.retrieve({
  //   database_id: process.env.NOTION_DB,
  // });
  // console.log("res", res);
  // const pageId = "dc5947c7c65d4944b1865af2ae435ae0";
  // const res = await notion.pages.retrieve({ page_id: pageId });
  // console.log("res", res);
  //   const page = await notion.pages.retrieve({ page_id: pageIds[0] });
  //   console.log("page", page);
  //   const data = {
  //     email: page?.properties?.Email?.email,
  //     url: page?.properties?.URL?.url,
  //     checkbox: page?.properties?.["Check This"]?.checkbox,
  //     phone: page?.properties?.Phone?.phone_number,
  //     name: page?.properties?.Name?.title[0].plain_text,
  //   };
  //   console.log("data", data);
}

async function getDbs() {
  const dbs = await notion.search();
  return dbs;
}

const getPages = async (pageIds) => {
  let pageData = [];
  try {
    pageIds.forEach(async (p) => {
      const page = await notion.pages.retrieve({ page_id: p });
      if (!page) throw "No Page";
      if (page) {
        const data = {
          email: page?.properties?.Email?.email,
          url: page?.properties?.URL?.url,
          checkbox: page?.properties?.["Check This"]?.checkbox,
          phone: page?.properties?.Phone?.phone_number,
          name: page?.properties?.Name?.title[0].plain_text,
        };
        // console.log("data", data);
        pageData.push(data);
        // console.log("pageData", pageData);
      }
      console.log("pageData", pageData);
      pageData;
    });
    // console.log("pageData", pageData);
    // return pageData;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

main();
