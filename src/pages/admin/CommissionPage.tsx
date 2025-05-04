
import React, { useState } from 'react';
import { Save, Info, DollarSign, BarChart, Tag, ShoppingBag, ArrowRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for commission histories
const mockCommissionHistory = [
  { 
    id: 1,
    effectiveDate: '2025-01-01',
    generalRate: 5,
    categories: [
      { name: 'Electronics', rate: 8 },
      { name: 'Fashion', rate: 6 },
      { name: 'Books', rate: 4 }
    ],
    changedBy: 'Ahmad Admin',
    note: 'Initial commission rates for 2025'
  },
  { 
    id: 2,
    effectiveDate: '2025-03-15',
    generalRate: 5.5,
    categories: [
      { name: 'Electronics', rate: 8 },
      { name: 'Fashion', rate: 6.5 },
      { name: 'Books', rate: 4 }
    ],
    changedBy: 'Budi Manager',
    note: 'Adjusted fashion category rates due to market trends'
  },
  { 
    id: 3,
    effectiveDate: '2025-04-01',
    generalRate: 5.5,
    categories: [
      { name: 'Electronics', rate: 8 },
      { name: 'Fashion', rate: 6.5 },
      { name: 'Books', rate: 4 },
      { name: 'Beauty', rate: 7 }
    ],
    changedBy: 'Ahmad Admin',
    note: 'Added Beauty category with 7% commission'
  }
];

const AdminCommissionPage = () => {
  const { toast } = useToast();
  const [generalRate, setGeneralRate] = useState(5.5);
  const [categoryRates, setCategoryRates] = useState([
    { name: 'Electronics', rate: 8 },
    { name: 'Fashion', rate: 6.5 },
    { name: 'Beauty', rate: 7 },
    { name: 'Home', rate: 5 },
    { name: 'Books', rate: 4 },
    { name: 'Sports', rate: 6 },
    { name: 'Toys', rate: 5.5 }
  ]);
  const [noteText, setNoteText] = useState('');
  const [history, setHistory] = useState(mockCommissionHistory);
  
  // Mock projected revenue data
  const projectedRevenue = 12500000; // Rp 12,500,000
  const estimatedCommission = projectedRevenue * (generalRate / 100);
  
  const handleGeneralRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      setGeneralRate(value);
    }
  };
  
  const handleCategoryRateChange = (categoryName: string, newRate: number) => {
    setCategoryRates(
      categoryRates.map(cat => 
        cat.name === categoryName ? { ...cat, rate: newRate } : cat
      )
    );
  };
  
  const handleSaveChanges = () => {
    // In a real scenario, this would send data to the backend
    // For now, we'll just update the history state
    
    if (noteText.trim() === '') {
      toast({
        title: "Note required",
        description: "Please add a note explaining this change.",
        variant: "destructive"
      });
      return;
    }
    
    const newHistoryEntry = {
      id: history.length + 1,
      effectiveDate: new Date().toISOString().split('T')[0],
      generalRate,
      categories: [...categoryRates],
      changedBy: 'Admin User',
      note: noteText
    };
    
    setHistory([newHistoryEntry, ...history]);
    setNoteText('');
    
    toast({
      title: "Changes saved",
      description: "The commission rates have been updated successfully."
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Commission Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* General Commission Rate */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-primary" />
              General Commission Rate
            </CardTitle>
            <CardDescription>
              Default rate applied to all categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Input
                type="number"
                value={generalRate}
                onChange={handleGeneralRateChange}
                className="max-w-[100px] text-xl font-bold"
                step="0.1"
                min="0"
                max="100"
              />
              <span className="text-2xl ml-2">%</span>
            </div>
          </CardContent>
        </Card>
        
        {/* Projected Revenue */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-primary" />
              Projected Commission
            </CardTitle>
            <CardDescription>
              Based on current sales forecast
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Monthly Revenue</span>
                <span>Rp {projectedRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Estimated Commission</span>
                <span>Rp {Math.round(estimatedCommission).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <ShoppingBag className="mr-2 h-4 w-4" />
              View Sales Reports
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Tag className="mr-2 h-4 w-4" />
              Special Category Rules
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Info className="mr-2 h-4 w-4" />
              Commission Policy
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Category-specific rates */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Category-Specific Commission Rates</CardTitle>
          <CardDescription>
            Set different rates for specific product categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categoryRates.map((category) => (
              <div key={category.name} className="border rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{category.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Input
                      type="number"
                      value={category.rate}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (!isNaN(value) && value >= 0 && value <= 100) {
                          handleCategoryRateChange(category.name, value);
                        }
                      }}
                      className="w-16 h-8 text-right font-bold"
                      step="0.1"
                      min="0"
                      max="100"
                    />
                    <span className="text-lg">%</span>
                  </div>
                </div>
                
                <div className="flex items-center text-sm">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${category.rate * 5}%` }}
                    ></div>
                  </div>
                  <div className="ml-2 text-gray-500">
                    {generalRate < category.rate ? '+' : ''}
                    {(category.rate - generalRate).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Save changes form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Save Commission Changes</CardTitle>
          <CardDescription>
            Add a note to explain these changes (will be visible in the history)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="note" className="block text-sm font-medium mb-1">
                Change Note
              </label>
              <textarea
                id="note"
                className="w-full border border-gray-300 rounded-md p-3 h-20"
                placeholder="e.g., 'Adjusting rates for Q3 2025 based on market analysis'"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end">
              <Button onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Commission History */}
      <Card>
        <CardHeader>
          <CardTitle>Commission Rate History</CardTitle>
          <CardDescription>
            Past changes to commission rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>General Rate</TableHead>
                <TableHead>Category Changes</TableHead>
                <TableHead>Changed By</TableHead>
                <TableHead>Note</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.effectiveDate}</TableCell>
                  <TableCell>{entry.generalRate}%</TableCell>
                  <TableCell>
                    {entry.categories.length} categories
                  </TableCell>
                  <TableCell>{entry.changedBy}</TableCell>
                  <TableCell className="max-w-xs truncate">{entry.note}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCommissionPage;
