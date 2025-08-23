"use client";

// import { useState } from "react";
import { Button } from "./ui/button";

type PurchaseButtonProps = {
  contentId: string;
  price: number;
  title: string;
  contentType: "book" | "article";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
};

export default function PurchaseButton(props: PurchaseButtonProps) {
  // const [loading, setLoading] = useState(false);

  // const handlePurchase = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch("/api/create-checkout-session", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         contentId: props.contentId,
  //         price: props.price,
  //         title: props.title,
  //         contentType: props.contentType,
  //       }),
  //     });
  //     if (response.status === 401) {
  //       alert("認証が必要です");
  //       window.location.href = "/api/auth/signin";
  //       return;
  //     }
  //     if (!response.ok) {
  //       throw new Error("購入処理エラー");
  //     }

  //     const data = await response.json();
  //     window.location.href = data.url;
  //   } catch (error) {
  //     console.error(error);
  //     alert("購入処理中にエラーが発生しました。");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Button
      onClick={() => alert("プレビュー環境では、決済はできません 😎")}
      // disabled={loading}
      size={props.size}
      className={props.className}
    >
      今すぐ購入する
    </Button>
  );
}
