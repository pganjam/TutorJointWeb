import { InstantiateExpr } from "@angular/compiler";

export class Discussion {
    id: string | undefined;
    message: string | undefined;
    title: string | undefined;
    party_id: string | undefined;
    username: string | undefined;
    course_id: string | undefined;
    comments: Array<Discussion> = [];
    createdOn: Date = new Date();
    updatedOn: Date = new Date();
  }