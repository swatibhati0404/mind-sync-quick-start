import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Shield, FileText, Calendar, MessageCircle, Lock, Globe } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

const Home = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Anonymous AI Support",
      description: "Chat with our AI counselor completely anonymously. No registration required."
    },
    {
      icon: FileText,
      title: "Mental Health Screening",
      description: "Take validated assessments (PHQ-9, GAD-7) to understand your mental wellness."
    },
    {
      icon: Globe,
      title: "Multilingual Resources",
      description: "Access support materials in your preferred language including regional dialects."
    },
    {
      icon: Calendar,
      title: "Confidential Booking",
      description: "Schedule sessions with trained counselors while maintaining complete privacy."
    },
    {
      icon: Shield,
      title: "Blockchain Privacy",
      description: "Your data is secured using Aptos blockchain technology for ultimate privacy."
    },
    {
      icon: Lock,
      title: "IPFS Storage",
      description: "Resources are stored on IPFS ensuring decentralized and secure access."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-subtle opacity-90" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
            Your Mental Wellness,
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-wellness bg-clip-text text-transparent">
              Your Privacy
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
            Anonymous mental health support for students powered by AI and secured by blockchain technology. 
            Get help without compromising your privacy or academic standing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
              <Link to="/chat">Start Anonymous Chat</Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg border-wellness text-wellness hover:bg-wellness hover:text-wellness-foreground">
              <Link to="/resources">Browse Resources</Link>
            </Button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>100% Anonymous</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-wellness" />
              <span>Blockchain Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-accent" />
              <span>24/7 Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Privacy-First Mental Health Support
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced technology meets compassionate care to provide you with the support you need while keeping your identity completely secure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-card transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card rounded-2xl p-12 shadow-soft border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Ready to Take the First Step?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your mental wellness journey starts with a single conversation. Connect with our AI support system or take a screening assessment to better understand your needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-wellness hover:bg-wellness/90 text-wellness-foreground px-8">
                <Link to="/chat">Start Conversation</Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link to="/resources">Take Screening Test</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;