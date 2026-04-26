
export type GroupType = "saving" | "welfare" | "investment" | "merry-go-round";
export type PaymentMethod = "platform" | "direct";
export type MemberRole = "admin" | "treasurer" | "secretary" | "member";
export type ChamaStatus = "active" | "inactive" | "pending";
export type DocumentType = "constitution" | "minutes" | "policy" | "other";

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: MemberRole;
  joinedAt: string;
  avatarInitials: string;
}

export interface ChamaDocument {
  id: string;
  title: string;
  type: DocumentType;
  content?: string;
  fileUrl?: string;
  fileName?: string;
  uploadedAt: string;
}

export interface PaymentConfig {
  method: PaymentMethod;
  destinationPaybill?: string;
  accountNumber?: string;
  consumerKey?: string;
  consumerSecret?: string;
  shortcode?: string;
  passkey?: string;
}

export interface Chama {
  id: string;
  name: string;
  description: string;
  groupType: GroupType;
  minimumContribution: number;
  meetingDay?: string;
  meetingTime?: string;
  communicationLink?: string;
  payment: PaymentConfig;
  members: Member[];
  documents: ChamaDocument[];
  status: ChamaStatus;
  createdAt: string;
  totalValue: number;
  totalContributions: number;
  activeLoans: number;
}


export interface BasicInfoForm {
  name: string;
  description: string;
}

export interface GroupSettingsForm {
  groupType: GroupType;
  minimumContribution: number;
  meetingDay: string;
  meetingTime: string;
}

export interface PaymentForm {
  method: PaymentMethod;
  destinationPaybill: string;
  accountNumber: string;
  consumerKey: string;
  consumerSecret: string;
  shortcode: string;
  passkey: string;
}

export interface CommunicationForm {
  communicationLink: string;
  documentTitle: string;
  documentType: DocumentType | "";
  documentContent: string;
  documentFile: File | null;
}

export interface MemberForm {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: MemberRole;
}

export interface CreateChamaState {
  step: number;
  basicInfo: BasicInfoForm;
  groupSettings: GroupSettingsForm;
  payment: PaymentForm;
  communication: CommunicationForm;
  members: MemberForm[];
}


export interface DashboardStats {
  totalContributions: number;
  incomeAnalysis: number;
  expenseAnalysis: number;
}

export interface Transaction {
  id: string;
  chamaName: string;
  amount: number;
  type: "credit" | "debit";
  date: string;
  description: string;
}

export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
}


export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  memberSince: string;
}