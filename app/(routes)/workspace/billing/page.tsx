"use client";
import { Button } from "@/components/ui/button";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { Check, Crown, Zap, Star, ArrowRight } from "lucide-react";
import Image from "next/image";

const BillingPage = () => {
 const plans = [
  {
   name: "Free",
   price: "$0",
   period: "forever",
   description: "Perfect for getting started",
   features: [
    "5 designs per month",
    "Basic templates",
    "Standard export quality",
    "Watermark on exports",
    "Community support",
   ],
   buttonText: "Current Plan",
   popular: false,
   icon: Star,
  },
  {
   name: "Pro",
   price: "$12.99",
   period: "per month",
   description: "For serious creators",
   features: [
    "Unlimited designs",
    "All premium templates",
    "HD export quality",
    "No watermark",
    "Priority support",
    "Commercial license",
    "1GB cloud storage",
   ],
   buttonText: "Upgrade to Pro",
   popular: true,
   icon: Zap,
  },
  {
   name: "Team",
   price: "$24.99",
   period: "per month",
   description: "For collaborative work",
   features: [
    "Everything in Pro",
    "5 team members",
    "Team workspace",
    "Shared templates",
    "Advanced analytics",
    "10GB cloud storage",
    "Dedicated account manager",
   ],
   buttonText: "Upgrade to Team",
   popular: false,
   icon: Crown,
  },
 ];

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
   <div className="w-full h-[200px] rounded-2xl mb-5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 relative overflow-hidden">
    <Image
     src={"/banner-home.png"}
     alt="banner"
     width={1800}
     height={300}
     className="w-full h-[200px] rounded-2xl object-cover"
    />
    <h2 className="absolute bottom-5 left-10 text-white text-3xl">Billing</h2>
   </div>
   <div className="max-w-7xl mx-auto">
    {/* Header */}
    <div className="text-center mb-16">
     <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
     <p className="text-lg text-gray-600 max-w-2xl mx-auto">
      Unlock powerful features to take your designs to the next level. Start
      free, upgrade anytime.
     </p>
    </div>

    {/* Pricing Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
     {plans.map((plan, index) => {
      const Icon = plan.icon;
      return (
       <Card
        key={index}
        className={`relative border-2 transition-all hover:scale-105 ${
         plan.popular
          ? "border-blue-300 shadow-xl ring-2 ring-blue-100"
          : "border-gray-200"
        }`}
       >
        {plan.popular && (
         <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
           Most Popular
          </span>
         </div>
        )}

        <CardHeader className="text-center pb-6">
         <div className="flex justify-center mb-4">
          <Icon className="w-8 h-8 text-blue-600" />
         </div>
         <CardTitle className="text-2xl font-bold text-gray-900">
          {plan.name}
         </CardTitle>
         <div className="flex items-baseline justify-center mt-4">
          <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
          <span className="text-gray-600 ml-2">{plan.period}</span>
         </div>
         <CardDescription className="text-gray-600 mt-2">
          {plan.description}
         </CardDescription>
        </CardHeader>

        <CardContent>
         <ul className="space-y-3 mb-8">
          {plan.features.map((feature, featureIndex) => (
           <li key={featureIndex} className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
           </li>
          ))}
         </ul>

         <Button
          className={`w-full ${
           plan.popular
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-900 hover:bg-gray-800"
          }`}
          size="lg"
         >
          {plan.buttonText}
          {!plan.buttonText.includes("Current") && (
           <ArrowRight className="ml-2 w-4 h-4" />
          )}
         </Button>
        </CardContent>
       </Card>
      );
     })}
    </div>

    {/* FAQ Section */}
    <div className="max-w-4xl mx-auto">
     <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
      Frequently Asked Questions
     </h2>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card>
       <CardHeader>
        <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
       </CardHeader>
       <CardContent>
        <p className="text-gray-600">
         Yes, you can cancel your subscription at any time. You'll continue to
         have access until the end of your billing period.
        </p>
       </CardContent>
      </Card>

      <Card>
       <CardHeader>
        <CardTitle className="text-lg">
         What payment methods do you accept?
        </CardTitle>
       </CardHeader>
       <CardContent>
        <p className="text-gray-600">
         We accept all major credit cards, PayPal, and bank transfers for annual
         plans.
        </p>
       </CardContent>
      </Card>

      <Card>
       <CardHeader>
        <CardTitle className="text-lg">Is there a free trial?</CardTitle>
       </CardHeader>
       <CardContent>
        <p className="text-gray-600">
         Yes! All paid plans come with a 14-day free trial. No credit card
         required to start.
        </p>
       </CardContent>
      </Card>

      <Card>
       <CardHeader>
        <CardTitle className="text-lg">Can I upgrade or downgrade?</CardTitle>
       </CardHeader>
       <CardContent>
        <p className="text-gray-600">
         Absolutely! You can change your plan at any time. Your billing will be
         prorated accordingly.
        </p>
       </CardContent>
      </Card>
     </div>
    </div>

    {/* Contact Support */}
    <div className="text-center mt-16">
     <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="py-8">
       <h3 className="text-xl font-semibold mb-4 text-gray-900">
        Need help deciding?
       </h3>
       <p className="text-gray-600 mb-6">
        Our team is here to help you choose the perfect plan for your needs.
       </p>
       <Button variant="outline" className="border-blue-300 text-blue-600">
        Contact Support
       </Button>
      </CardContent>
     </Card>
    </div>
   </div>
  </div>
 );
};

export default BillingPage;
