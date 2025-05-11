
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Package, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockProducts } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import ProductFormDialog from '@/components/seller/ProductFormDialog';

const SellerProductsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(mockProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNewProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would be an API call
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted.",
    });
  };

  const handleSaveProduct = (productData: any) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === editingProduct.id ? {...productData, id: editingProduct.id} : p));
      toast({
        title: "Product updated",
        description: "The product has been successfully updated.",
      });
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        seller: "CurrentSeller",
        rating: 0,
        reviews: 0,
      };
      setProducts([...products, newProduct]);
      toast({
        title: "Product added",
        description: "The new product has been successfully added.",
      });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div>
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <div className="flex gap-4 items-center mb-6 mt-4">
          <Button 
            onClick={handleAddNewProduct}
            className="bg-primary text-white"
          >
            <Plus size={18} className="mr-2" />
            Add New Product
          </Button>
          <Button 
            onClick={() => navigate('upload')}
            className="bg-primary text-white"
          >
            <Plus size={18} className="mr-2" />
            Import CSV/Excel
          </Button>
        </div>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.slice(0, 20).map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-md bg-gray-100 overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="truncate max-w-[200px]">{product.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Package size={16} className="mr-1" />
                          <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="border rounded-lg p-6 text-center text-gray-500">
              <p>No products found matching your search</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ProductFormDialog 
        open={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
};

export default SellerProductsPage;
