// Importamos jsPDF desde un CDN sin usar la sintaxis de módulo
const imageToPdfLib = (() => {
  // Función principal para convertir una imagen a PDF
  const convertImageToPDF = (imageSrc, outputFileName = 'output.pdf') => {
    // Accedemos a jsPDF desde el objeto global
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const imgWidth = img.width > 210 ? 210 : img.width;  // Ajuste de ancho para A4
      const imgHeight = (img.height * imgWidth) / img.width;  // Mantener proporción

      console.log('Imagen cargada. Ancho:', imgWidth, 'Alto:', imgHeight);

      // Ajustamos la imagen al tamaño del PDF
      pdf.addImage(img, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save(outputFileName);
    };

    img.onerror = () => {
      console.error('Error al cargar la imagen.');
    };
  };

  // Método para convertir una imagen subida por el usuario a PDF
  const convertUploadedImageToPDF = (fileInputElement, outputFileName = 'output.pdf') => {
    const file = fileInputElement.files[0];
    if (file && file.type.match('image.*')) {
      console.log('Archivo seleccionado:', file);

      const reader = new FileReader();
      reader.onload = function(event) {
        const imageSrc = event.target.result;
        console.log('Imagen leída desde FileReader.');
        convertImageToPDF(imageSrc, outputFileName);
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No se ha subido una imagen válida.');
    }
  };

  return {
    convertUploadedImageToPDF,
  };
})();

export default imageToPdfLib;
