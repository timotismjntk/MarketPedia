
import React, { useState, useRef } from 'react';
import { Upload, FileText, Download, AlertCircle, Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SellerUploadPage = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'preview' | 'validating' | 'success' | 'error'>('idle');
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (!selectedFile) {
      return;
    }

    // Check file type
    if (!selectedFile.name.endsWith('.csv') && !selectedFile.name.endsWith('.xlsx')) {
      toast({
        title: "Format file tidak didukung",
        description: "Harap unggah file Excel (.xlsx) atau CSV (.csv)",
        variant: "destructive"
      });
      return;
    }

    setFile(selectedFile);
    
    // Mock preview data generation (in a real app, you'd parse the CSV/Excel)
    setTimeout(() => {
      const mockPreviewData = [
        {
          name: "Sepatu Running Nike Air Zoom",
          price: 1500000,
          category: "Sepatu",
          description: "Sepatu lari dengan teknologi Air Zoom untuk kenyamanan maksimal.",
          inStock: true,
          image: "https://example.com/image1.jpg",
          valid: true
        },
        {
          name: "Kemeja Flanel Uniqlo",
          price: 349000,
          category: "Pakaian",
          description: "Kemeja flanel premium dengan bahan lembut dan nyaman.",
          inStock: true,
          image: "https://example.com/image2.jpg",
          valid: true
        },
        {
          name: "",
          price: -1000,
          category: "Aksesoris",
          description: "Gelang kulit asli handmade.",
          inStock: true,
          image: "",
          valid: false
        },
        {
          name: "Headphone Sony WH-1000XM4",
          price: 3999000,
          category: "Elektronik",
          description: "Headphone noise-cancelling premium dengan kualitas suara terbaik.",
          inStock: true,
          image: "https://example.com/image4.jpg",
          valid: true
        },
        {
          name: "Topi Baseball Adidas",
          price: 0,
          category: "",
          description: "Topi baseball dengan logo Adidas.",
          inStock: false,
          image: "https://example.com/image5.jpg",
          valid: false
        }
      ];
      
      setPreviewData(mockPreviewData);
      setUploadStatus('preview');
      
      // Check for errors
      const errors = [];
      if (mockPreviewData.some(item => !item.name)) {
        errors.push("Beberapa produk tidak memiliki nama");
      }
      if (mockPreviewData.some(item => item.price <= 0)) {
        errors.push("Beberapa produk memiliki harga tidak valid");
      }
      if (mockPreviewData.some(item => !item.category)) {
        errors.push("Beberapa produk tidak memiliki kategori");
      }
      if (mockPreviewData.some(item => !item.image)) {
        errors.push("Beberapa produk tidak memiliki URL gambar");
      }
      
      setErrorMessages(errors);
    }, 1000);
  };

  const handleUpload = () => {
    setUploadStatus('validating');
    
    // Simulate processing
    setTimeout(() => {
      if (errorMessages.length > 0) {
        setUploadStatus('error');
        toast({
          title: "Gagal mengunggah produk",
          description: "Harap perbaiki kesalahan terlebih dahulu.",
          variant: "destructive"
        });
      } else {
        setUploadStatus('success');
        toast({
          title: "Produk berhasil diunggah",
          description: `${previewData.filter(p => p.valid).length} produk telah ditambahkan ke katalog.`
        });
      }
    }, 2000);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDownloadTemplate = () => {
    // In a real app, you would generate and download a template file
    toast({
      title: "Template diunduh",
      description: "Template Excel telah berhasil diunduh."
    });
  };

  const resetUpload = () => {
    setFile(null);
    setPreviewData([]);
    setUploadStatus('idle');
    setErrorMessages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Upload Produk Massal</h1>
        <Button 
          variant="outline"
          onClick={handleDownloadTemplate}
          className="flex items-center"
        >
          <Download size={18} className="mr-2" />
          Download Template
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {uploadStatus === 'idle' && (
              <>
                <Upload size={48} className="text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Unggah File Produk</h3>
                <p className="text-gray-500 text-center mb-4">
                  Unggah file Excel (.xlsx) atau CSV (.csv) dengan data produk Anda
                </p>
                <Button onClick={triggerFileInput}>
                  Pilih File
                </Button>
              </>
            )}
            
            {uploadStatus !== 'idle' && (
              <div className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FileText size={24} className="text-primary mr-2" />
                    <div>
                      <p className="font-medium">{file?.name}</p>
                      <p className="text-sm text-gray-500">
                        {file && (file.size / 1024).toFixed(1)} KB · 
                        {previewData.length} produk · 
                        {previewData.filter(p => p.valid).length} valid
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    {uploadStatus !== 'validating' && (
                      <Button variant="ghost" size="icon" onClick={resetUpload}>
                        <X size={18} />
                      </Button>
                    )}
                  </div>
                </div>
                
                {errorMessages.length > 0 && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Terdapat kesalahan pada data</AlertTitle>
                    <AlertDescription>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        {errorMessages.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
                
                {uploadStatus === 'validating' && (
                  <div className="flex items-center justify-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    <span className="ml-3">Memvalidasi dan mengupload data...</span>
                  </div>
                )}
                
                {uploadStatus === 'success' && (
                  <Alert className="mb-4 bg-green-50 border-green-200">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">Upload berhasil</AlertTitle>
                    <AlertDescription className="text-green-700">
                      {previewData.filter(p => p.valid).length} produk telah berhasil ditambahkan ke katalog Anda.
                    </AlertDescription>
                  </Alert>
                )}
                
                {uploadStatus === 'preview' && (
                  <div className="flex justify-end mt-4">
                    <Button 
                      variant="outline" 
                      className="mr-2"
                      onClick={resetUpload}
                    >
                      Batal
                    </Button>
                    <Button
                      onClick={handleUpload}
                      disabled={previewData.filter(p => p.valid).length === 0}
                    >
                      Upload Produk
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {previewData.length > 0 && uploadStatus !== 'validating' && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Preview Data</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Nama Produk</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Deskripsi</TableHead>
                    <TableHead>Stok</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {previewData.map((product, index) => (
                    <TableRow key={index} className={!product.valid ? "bg-red-50" : ""}>
                      <TableCell>
                        {product.valid ? 
                          <Check size={18} className="text-green-500" /> : 
                          <AlertCircle size={18} className="text-red-500" />
                        }
                      </TableCell>
                      <TableCell className={!product.name ? "text-red-500" : ""}>
                        {product.name || "Nama tidak ada"}
                      </TableCell>
                      <TableCell className={product.price <= 0 ? "text-red-500" : ""}>
                        {product.price > 0 ? 
                          `Rp ${product.price.toLocaleString('id-ID')}` : 
                          "Harga tidak valid"
                        }
                      </TableCell>
                      <TableCell className={!product.category ? "text-red-500" : ""}>
                        {product.category || "Kategori kosong"}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate">
                          {product.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                          {product.inStock ? "Tersedia" : "Tidak Tersedia"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SellerUploadPage;
