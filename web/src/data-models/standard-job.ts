import CPRClient from "./cpr-client";

export default interface StandardJob {
  startDate: Date,
  dueDate: Date,
  jobNumber: string,
  tech?: string,
  shNumber: number,
  orderNumber: string,
  client: CPRClient,
  description: string,
  status: Status,
  meterNumber: number,
  workCarriedOut: Array<string>
}
export enum Status {
  Issued,
  Accepted,
  AwaitingAccess,
  AwaitingParts,
  AwaitingApproval,
  Camcelled
}