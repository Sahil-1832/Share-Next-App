import { NextResponse } from  'next/server'

export async function POST(request:Request){
    try{
        const body = await request.json();
        console.log("Request body:",body);

        const orderData = {
            amount: body.amount,
            currency:"INR",
        };

        const response = await fetch("https://api.razorpay.com/v1/orders",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Basic ${Buffer.from(
                    `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
                ).toString("base64")}`,
            },
            body:JSON.stringify(orderData),
        });

        console.log("Razorpay resopnse status:",response.status);

        if(!response.ok){
            const errorText = await  response.text();
            console.error("Razorpay API Error:",errorText);
            throw new Error("Failed to create Razorpay order");
        }

        const data = await response.json();
        console.log("Razorpay  Order created successfully:",data);

        return NextResponse.json({orderId:data.id});
    }catch(error){
        console.error("Error creating Razorpay order:",error);
        return NextResponse.json(
            {error:"Error creating order"},
            {status:500}
        );
    }
}