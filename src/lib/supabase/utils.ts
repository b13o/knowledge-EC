// import { redirect } from "next/navigation";
// import { auth } from "../../../auth";
// import { supabaseAdmin } from "./client";

// interface CreatePurchaseParams {
//   userIdentifier: string;
//   contentId: string;
//   paymentIntentId: string;
//   amount: number;
// }

// /**
//  * 購入履歴を記録する
//  */
// export async function createPurchaseRecord({
//   userIdentifier,
//   contentId,
//   paymentIntentId,
//   amount,
// }: CreatePurchaseParams) {
//   const { data, error } = await supabaseAdmin
//     .from("purchases")
//     .insert({
//       user_identifier: userIdentifier,
//       content_id: contentId,
//       stripe_payment_intent_id: paymentIntentId,
//       amount,
//     })
//     .select()
//     .single();

//   if (error) {
//     console.error("購入記録エラー:", error);
//     throw error;
//   }

//   return data;
// }

// /**
//  * ユーザーの既存の購入記録をチェック
//  */
// export async function checkUserPurchase(
//   userIdentifier: string,
//   contentId: string
// ) {
//   try {
//     const { data } = await supabaseAdmin
//       .from("purchases")
//       .select("id")
//       .eq("user_identifier", userIdentifier)
//       .eq("content_id", contentId)
//       .maybeSingle();

//     return !!data;
//   } catch (error) {
//     console.error("購入確認エラー:", error);
//     throw error;
//   }
// }

// /**
//  * アクセス時に、有料コンテンツを購入していない場合はリダイレクト
//  */
// export async function checkAccessAndRedirect(
//   contentId: string,
//   contentType: "book" | "article"
// ) {
//   // ログインの確認
//   const session = await auth();
//   if (!session?.user) redirect("/api/auth/signin");

//   // 購入の確認
//   const hasPurchased = await checkUserPurchase(session.user.id!, contentId);
//   if (!hasPurchased) {
//     const redirectUrl =
//       contentType === "book"
//         ? `${process.env.NEXT_PUBLIC_BASE_URL}/books/${contentId}`
//         : `${process.env.NEXT_PUBLIC_BASE_URL}/#articles`;

//     redirect(redirectUrl);
//   }
// }
