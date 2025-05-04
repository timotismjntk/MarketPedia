
import React, { useState } from 'react';
import { Plus, Trash, Edit, Move } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { categories } from "@/lib/mockData";

// Initial mock category data
const initialCategories = categories
  .filter(cat => cat !== 'All')
  .map((category, index) => ({
    id: (index + 1).toString(),
    name: category,
    slug: category.toLowerCase().replace(/\s+/g, '-'),
    parent: null,
    featured: index < 3,
    productCount: Math.floor(Math.random() * 100) + 5,
  }));

// Add some subcategories
initialCategories.push(
  {
    id: "8",
    name: "Men's Fashion",
    slug: "mens-fashion",
    parent: "2",
    featured: true,
    productCount: 45,
  },
  {
    id: "9",
    name: "Women's Fashion",
    slug: "womens-fashion",
    parent: "2",
    featured: true,
    productCount: 78,
  },
  {
    id: "10",
    name: "Kid's Fashion",
    slug: "kids-fashion",
    parent: "2",
    featured: false,
    productCount: 32,
  },
  {
    id: "11",
    name: "Smartphones",
    slug: "smartphones",
    parent: "1",
    featured: true,
    productCount: 67,
  }
);

const AdminCategoriesPage = () => {
  const { toast } = useToast();
  const [categoryData, setCategoryData] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parent: "",
    featured: false,
  });

  // Filter categories based on search
  const filteredCategories = categoryData.filter(
    cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get parent categories (top-level)
  const parentCategories = categoryData.filter(cat => cat.parent === null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));

      // Auto-generate slug when name changes
      if (name === 'name') {
        const slug = value.toLowerCase().replace(/\s+/g, '-');
        setFormData(prev => ({ ...prev, slug }));
      }
    }
  };

  const handleAddCategory = () => {
    setCurrentCategory(null);
    setFormData({
      name: "",
      slug: "",
      parent: "",
      featured: false,
    });
    setIsDialogOpen(true);
  };

  const handleEditCategory = (category: any) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      parent: category.parent || "",
      featured: category.featured,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteCategory = (id: string) => {
    // Check if category has subcategories
    const hasSubcategories = categoryData.some(cat => cat.parent === id);
    
    if (hasSubcategories) {
      toast({
        title: "Cannot delete category",
        description: "This category has subcategories. Please delete or reassign them first.",
        variant: "destructive"
      });
      return;
    }
    
    setCategoryData(categoryData.filter(cat => cat.id !== id));
    toast({
      title: "Category deleted",
      description: "The category has been removed successfully."
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentCategory) {
      // Update existing category
      setCategoryData(categoryData.map(cat => 
        cat.id === currentCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
      toast({
        title: "Category updated",
        description: `${formData.name} has been updated successfully.`
      });
    } else {
      // Create new category
      const newCategory = {
        id: Date.now().toString(),
        name: formData.name,
        slug: formData.slug,
        parent: formData.parent || null,
        featured: formData.featured,
        productCount: 0,
      };
      setCategoryData([...categoryData, newCategory]);
      toast({
        title: "Category created",
        description: `${formData.name} has been added successfully.`
      });
    }
    
    setIsDialogOpen(false);
  };

  // Get category tree for display
  const getCategoryName = (id: string | null) => {
    if (!id) return "-";
    const category = categoryData.find(cat => cat.id === id);
    return category ? category.name : "-";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>
      
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
          </div>
          
          <Button onClick={handleAddCategory}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{getCategoryName(category.parent)}</TableCell>
                <TableCell>{category.productCount}</TableCell>
                <TableCell>
                  {category.featured ? (
                    <span className="text-green-600">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleEditCategory(category)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      onClick={() => handleDeleteCategory(category.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredCategories.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No categories found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentCategory ? "Edit Category" : "Create New Category"}
            </DialogTitle>
            <DialogDescription>
              {currentCategory
                ? "Update the category details below."
                : "Fill in the details to create a new category."}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Category Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="slug" className="text-sm font-medium">
                Slug
              </label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
              />
              <p className="text-xs text-gray-500">
                Used in URLs, auto-generated from name
              </p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="parent" className="text-sm font-medium">
                Parent Category
              </label>
              <select
                id="parent"
                name="parent"
                value={formData.parent}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">None (Top Level)</option>
                {parentCategories.map((cat) => (
                  <option 
                    key={cat.id} 
                    value={cat.id}
                    disabled={currentCategory && currentCategory.id === cat.id}
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="rounded border-gray-300"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                Featured Category
              </label>
            </div>
            
            <DialogFooter>
              <Button type="submit">
                {currentCategory ? "Save Changes" : "Create Category"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCategoriesPage;
