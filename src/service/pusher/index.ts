import { nanoid } from "nanoid";
import { pusherServer } from "@/libs/pusher/server";

export function auth(req) {
  return {"message" : "server auth complted."};
  // const data = await req.text()
  // const [socketId, channelName] = data
  //   .split("&")
  //   .map((str) => str.split("=")[1])

  // const id = nanoid()

  // const presenceData = {
  //   user_id: id,
  //   user_data: { user_id: id },
  // }

  // const auth = pusherServer.authorizeChannel(
  //   socketId,
  //   channelName,
  //   presenceData
  // )

  // return new Response(JSON.stringify(auth))
}