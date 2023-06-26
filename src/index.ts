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
    const user = await db("users")
      .insert({
        name: "user 3",
      })
      .returning("*");

    console.log(user);
    return;
  }

  if (param === "profile") {
    console.log(">> Insert Profile");
    const profile = await db("profiles")
      .insert({
        name: "profile 1",
        user_id: 1,
      })
      .returning("*");

    console.log(profile);

    return;
  }

  if (param === "sub") {
    console.log(">> Insert Sub");
    const sub = await db("sub_objects")
      .insert({
        name: "sub 2",
        object_id: 2,
      })
      .returning("*");

    console.log(sub);

    return;
  }

  if (param === "get-user") {
    console.log(">> Get User");
    const user = await db("users")
      .leftJoin("profiles", "users.id", "=", "profiles.user_id")
      .where("users.id", 1)
      .select([
        "users.*",
        db.raw("(json_agg(profiles.*) ->> 0)::json as profile"),
      ])
      .groupBy(["users.id", "profiles.id"])
      .first();

    console.log(user);
    return;
  }

  if (param === "all-rel") {
    console.log(">> Return User with all relationships");
    const user = await db("users")
      .leftJoin("profiles", "users.id", "=", "profiles.user_id")
      .leftJoin("user_objects", "users.id", "=", "user_objects.user_id")
      .leftJoin("objects", "user_objects.object_id", "=", "objects.id")
      .where("users.id", 1)
      .select([
        "users.*",
        db.raw("(json_agg(profiles.*) ->> 0)::json as profile"),
        db.raw(
          "case when count(objects) = 0 then '[]' else json_agg(objects.*) end as objects"
        ),
      ])
      .groupBy(["users.id", "profiles.id"])
      .first();

    console.log(user);
    return;
  }

  console.log("== Param not found");
};

main();
