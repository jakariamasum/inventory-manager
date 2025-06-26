/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Button from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Shield,
  Zap,
  BarChart3,
  Users,
  Globe,
  ArrowRight,
  Star,
} from "lucide-react";
import Title from "@/components/title";

const Home = () => {
  const features = [
    {
      icon: Package,
      title: "Smart Inventory",
      description:
        "Advanced inventory tracking with real-time updates and low-stock alerts.",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with JWT authentication and encrypted data.",
      color: "text-green-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized performance with efficient data structures and caching.",
      color: "text-yellow-500",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Comprehensive insights and reports to make data-driven decisions.",
      color: "text-purple-500",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Multi-user support with role-based access control.",
      color: "text-pink-500",
    },
    {
      icon: Globe,
      title: "Cloud-Based",
      description:
        "Access your inventory from anywhere with our cloud infrastructure.",
      color: "text-indigo-500",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      company: "TechCorp",
      content:
        "InventoryPro transformed our inventory management. We've reduced stock-outs by 90%.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "StartupXYZ",
      content:
        "The best inventory solution we've used. Clean interface and powerful features.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Warehouse Manager",
      company: "LogiFlow",
      content:
        "Real-time tracking and alerts have made our operations so much more efficient.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ">
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <Badge
            variant="secondary"
            className="px-6 py-2 text-sm font-medium shadow-sm"
          >
            Modern Inventory Management Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Manage Your Inventory
            <span className="block bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Like a Pro
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Streamline your inventory management with our modern, efficient, and
            user-friendly platform. Built with cutting-edge technology for
            maximum performance and reliability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="auth/register">
              <Button
                size="lg"
                className="px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="auth/login">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <Title
          badge="features"
          title="Everything You Need"
          subtitle="Powerful features designed to make inventory management effortless and efficient."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
            >
              <CardHeader className="pb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`h-7 w-7 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold">10K+</div>
              <div className="text-xl text-white/90">Products Managed</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold">500+</div>
              <div className="text-xl text-white/90">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl md:text-6xl font-bold">99.9%</div>
              <div className="text-xl text-white/90">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <Title
          badge="Testimonials"
          title="What Our Customers Say"
          subtitle="Don't just take our word for it. Here's what real customers have to
            say about InventoryPro."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-pink-500/5 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
          <CardContent className="p-12 text-center relative z-10">
            <Title
              badge="Get Started"
              title="Join the Inventory Revolution"
              subtitle="Experience the future of inventory management with InventoryPro. Our platform is designed to help you manage your inventory efficiently, reduce costs, and improve productivity."
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="auth/register">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Demo
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};
export default Home;
