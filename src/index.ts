import { knex } from "knex";
import { config } from "./db/config";

const db = knex({
  ...config,
});

const main = async () => {
  const args = process.argv;
  const param = args[2];

  if (param === "objects") {
    console.log(">> Insert object 1");
    console.log(">> Insert object 2");

    const obj = await db("objects").insert({
      name: "object 1",
    });

    console.log(obj);
    return;
  }

  if (param === "user") {
    console.log(">> Insert User");
    return;
  }

  if (param === "profile") {
    console.log(">> Insert Profile");
    return;
  }

  if (param === "get-user") {
    console.log(">> Get User");
    return;
  }

  if (param === "update-user") {
    console.log(">> Update User | Attach profile");
    return;
  }

  if (param === "attach") {
    console.log(">> Attach object 1 and 2 to User");
    console.log(">> Return User with all relationships");
    return;
  }

  console.log("== Param not found");
};

main();
