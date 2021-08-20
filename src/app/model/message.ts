export class Message {
    id: string | undefined;
    parent_id: string | undefined;
    reference_id: string | undefined;
    party_id: string | undefined;   
    category: string | undefined;
    title: string | undefined;
    message: string | undefined; 
    username: string | undefined;
    commentsCount: number | undefined;
    lastCommentedBy: string | undefined;
    lastCommentedDate: Date | undefined;
    createdOn: Date | undefined;
    updatedOn: Date | undefined;
  }
  