import { Link, useLocation } from "react-router-dom";
import { Shield, Brain, FileText, Calendar, BarChart3 } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const navigation = [
    { name: "Home", path: "/", icon: Brain },
    { name: "Chat Support", path: "/chat", icon: Brain },
    { name: "Resources", path: "/resources", icon: FileText },
    { name: "Book Session", path: "/booking", icon: Calendar },
    { name: "Admin", path: "/admin", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl text-foreground">WellnessVault</span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-6">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-wellness" />
                <span>Privacy Protected</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t border-border bg-card/30 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 WellnessVault. Privacy-first mental health support.</p>
            <div className="mt-2 flex items-center justify-center space-x-4">
              <span className="flex items-center space-x-1">
                <Shield className="h-3 w-3 text-wellness" />
                <span>Blockchain Secured</span>
              </span>
              <span className="flex items-center space-x-1">
                <FileText className="h-3 w-3 text-accent" />
                <span>IPFS Hosted</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;