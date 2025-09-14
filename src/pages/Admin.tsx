import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart
} from "recharts";
import { 
  Users, MessageCircle, Calendar, FileText, TrendingUp, Shield, 
  Download, RefreshCw, Eye, Clock, AlertTriangle, CheckCircle 
} from "lucide-react";

const Admin = () => {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock data for analytics
  const overviewStats = [
    { title: "Total Users", value: "1,247", change: "+12.3%", icon: Users, trend: "up" },
    { title: "Chat Sessions", value: "3,892", change: "+8.7%", icon: MessageCircle, trend: "up" },
    { title: "Bookings", value: "156", change: "+15.2%", icon: Calendar, trend: "up" },
    { title: "Resources Accessed", value: "2,341", change: "+5.8%", icon: FileText, trend: "up" }
  ];

  const mentalHealthData = [
    { category: "Stress", count: 487, percentage: 39.1, color: "#3B82F6" },
    { category: "Anxiety", count: 312, percentage: 25.0, color: "#10B981" },
    { category: "Depression", count: 201, percentage: 16.1, color: "#8B5CF6" },
    { category: "Sleep Issues", count: 147, percentage: 11.8, color: "#F59E0B" },
    { category: "Other", count: 100, percentage: 8.0, color: "#6B7280" }
  ];

  const usageOverTime = [
    { date: "2024-01-01", users: 120, sessions: 340, bookings: 23 },
    { date: "2024-01-02", users: 135, sessions: 378, bookings: 28 },
    { date: "2024-01-03", users: 149, sessions: 420, bookings: 31 },
    { date: "2024-01-04", users: 162, sessions: 445, bookings: 35 },
    { date: "2024-01-05", users: 178, sessions: 489, bookings: 42 },
    { date: "2024-01-06", users: 195, sessions: 523, bookings: 38 },
    { date: "2024-01-07", users: 212, sessions: 567, bookings: 45 }
  ];

  const recentBookings = [
    { id: "BK001", type: "Individual", urgency: "routine", status: "confirmed", time: "2 hours ago", hash: "0xa1b2c3..." },
    { id: "BK002", type: "Crisis", urgency: "urgent", status: "pending", time: "1 hour ago", hash: "0xd4e5f6..." },
    { id: "BK003", type: "Group", urgency: "priority", status: "confirmed", time: "30 min ago", hash: "0x789abc..." },
    { id: "BK004", type: "Consultation", urgency: "routine", status: "completed", time: "15 min ago", hash: "0xdef123..." }
  ];

  const systemMetrics = [
    { metric: "Blockchain Transactions", value: "45,231", status: "healthy" },
    { metric: "IPFS Storage", value: "2.3 TB", status: "healthy" },
    { metric: "Average Response Time", value: "1.2s", status: "healthy" },
    { metric: "Uptime", value: "99.97%", status: "healthy" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-wellness text-wellness-foreground";
      case "pending": return "bg-accent text-accent-foreground";
      case "completed": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent": return "text-destructive";
      case "priority": return "text-accent";
      case "routine": return "text-wellness";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor platform usage, user wellness trends, and system health.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewStats.map((stat, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className={`h-4 w-4 mr-1 ${stat.trend === "up" ? "text-wellness" : "text-destructive"}`} />
                <span className={`text-sm font-medium ${stat.trend === "up" ? "text-wellness" : "text-destructive"}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-muted-foreground ml-1">vs last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mental Health Issues Distribution */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Mental Health Concerns</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Distribution of reported mental health concerns
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={mentalHealthData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="count"
                      label={({ category, percentage }) => `${category} ${percentage}%`}
                    >
                      {mentalHealthData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="mt-4 space-y-2">
                  {mentalHealthData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.category}</span>
                      </div>
                      <span className="font-medium">{item.count} users</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Usage Trends */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Platform Usage Trends</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Daily active users and session counts
                </p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={usageOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="users" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="sessions" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <p className="text-sm text-muted-foreground">
                Latest counseling session bookings and their status
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium text-foreground">{booking.id}</p>
                        <p className="text-sm text-muted-foreground">{booking.time}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm">{booking.type} Session</p>
                        <p className={`text-xs ${getUrgencyColor(booking.urgency)}`}>
                          {booking.urgency} priority
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                      
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Blockchain Hash</p>
                        <p className="text-xs font-mono text-foreground">{booking.hash}</p>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {systemMetrics.map((metric, index) => (
              <Card key={index} className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.metric}</p>
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-6 w-6 text-wellness" />
                      <span className="text-sm text-wellness">Healthy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Blockchain Activity</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Recent transactions on Aptos blockchain
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "Booking Encrypted", hash: "0xa1b2c3d4e5f6...", time: "2 min ago" },
                    { type: "Chat Log Stored", hash: "0x789abcdef123...", time: "5 min ago" },
                    { type: "User Data Hashed", hash: "0x456789abcd...", time: "8 min ago" },
                    { type: "Session Completed", hash: "0xfedcba987654...", time: "12 min ago" }
                  ].map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-border rounded">
                      <div>
                        <p className="text-sm font-medium text-foreground">{tx.type}</p>
                        <p className="text-xs font-mono text-muted-foreground">{tx.hash}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{tx.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle>IPFS Storage Stats</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Decentralized storage metrics
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Files</span>
                    <span className="font-medium">2,347</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Storage Used</span>
                    <span className="font-medium">2.3 TB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active Nodes</span>
                    <span className="font-medium">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Replication Factor</span>
                    <span className="font-medium">3x</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;