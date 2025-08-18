
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FolderKanban, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProjectRequirementsFormProps {
    projectType: string;
    onBack: () => void;
    onSubmitSuccess: () => void;
}

const COMMON_FEATURES: { [key: string]: string[] } = {
    web: ["Blog", "Galería de Imágenes", "Formulario de Contacto Avanzado", "Mapa Interactivo"],
    movil: ["Notificaciones Push", "Geolocalización", "Acceso a Cámara/Galería", "Login con Biometría"],
    software: ["Dashboard de Analíticas", "Gestión de Roles y Permisos", "Importación/Exportación de Datos", "Integración con APIs de Terceros"],
    ecommerce: ["Carrito de Compras", "Pasarelas de Pago (Stripe/PayPal)", "Gestión de Inventario", "Sistema de Reseñas de Productos", "Cupones de Descuento"],
    otro: ["Login de Usuarios", "Pagos en línea", "Panel de Administración", "Notificaciones por email", "Integración con API externa", "Reportes y Analíticas"],
};

const PLATFORMS = ["Aplicación Web", "Aplicación iOS", "Aplicación Android", "Otro"];

export default function ProjectRequirementsForm({ projectType, onBack, onSubmitSuccess }: ProjectRequirementsFormProps) {
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        contactInfo: { name: '', company: '', email: '', phone: '' },
        projectInfo: { projectName: '', projectIdea: '', targetAudience: '', mainGoals: ['', '', ''], competitors: '', budget: '' },
        scopeAndFeatures: { platforms: [] as string[], commonFeatures: [] as string[], otherFeatures: '' },
        designAndUX: { hasBrandIdentity: 'no', brandFiles: [], designInspirations: ['', ''], lookAndFeel: '' },
        contentAndStrategy: { contentCreation: '', marketingPlan: '', maintenance: '' },
        attachments: [],
    });
    
    const relevantFeatures = COMMON_FEATURES[projectType] || COMMON_FEATURES['otro'];

    const handleChange = (section: string, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                // @ts-ignore
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleGoalChange = (index: number, value: string) => {
        const newGoals = [...formData.projectInfo.mainGoals];
        newGoals[index] = value;
        handleChange('projectInfo', 'mainGoals', newGoals);
    };
    
    const handlePlatformChange = (platform: string) => {
        const currentPlatforms = formData.scopeAndFeatures.platforms;
        const newPlatforms = currentPlatforms.includes(platform)
            ? currentPlatforms.filter(p => p !== platform)
            : [...currentPlatforms, platform];
        handleChange('scopeAndFeatures', 'platforms', newPlatforms);
    }

    const handleFeatureChange = (feature: string) => {
        const currentFeatures = formData.scopeAndFeatures.commonFeatures;
        const newFeatures = currentFeatures.includes(feature)
            ? currentFeatures.filter(f => f !== feature)
            : [...currentFeatures, feature];
        handleChange('scopeAndFeatures', 'commonFeatures', newFeatures);
    }
    
    const handleInspirationChange = (index: number, value: string) => {
        const newInspirations = [...formData.designAndUX.designInspirations];
        newInspirations[index] = value;
        handleChange('designAndUX', 'designInspirations', newInspirations);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log('Form submitted:', JSON.stringify({ projectType, ...formData }, null, 2));
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsLoading(false);
        toast({
            title: "Requerimientos Enviados",
            description: "Gracias por completar el formulario. Nos pondremos en contacto contigo pronto.",
        });
        onSubmitSuccess();
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev > 1 ? prev - 1 : 1);

    const totalSteps = 6;


  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-3xl">
         <div className="mb-4">
            <Button variant="outline" onClick={onBack}>Volver a seleccionar tipo</Button>
        </div>
        <div className="mb-8 flex flex-col items-center text-center">
            <FolderKanban className="mb-4 h-12 w-12 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Cuéntanos sobre tu Proyecto</h1>
            <p className="text-muted-foreground">
                Estás en el paso {currentStep} de {totalSteps}. Completa este formulario para que podamos entender tu visión.
            </p>
        </div>
        
        <form onSubmit={handleSubmit}>
            <Card>
                {currentStep === 1 && (
                    <>
                        <CardHeader>
                            <CardTitle>Información de Contacto</CardTitle>
                            <CardDescription>Empecemos con lo básico. ¿Quién eres?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre Completo</Label>
                                    <Input id="name" value={formData.contactInfo.name} onChange={e => handleChange('contactInfo', 'name', e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="company">Empresa</Label>
                                    <Input id="company" value={formData.contactInfo.company} onChange={e => handleChange('contactInfo', 'company', e.target.value)} />
                                </div>
                            </div>
                             <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Correo Electrónico</Label>
                                    <Input id="email" type="email" value={formData.contactInfo.email} onChange={e => handleChange('contactInfo', 'email', e.target.value)} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Teléfono</Label>
                                    <Input id="phone" type="tel" value={formData.contactInfo.phone} onChange={e => handleChange('contactInfo', 'phone', e.target.value)} />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-end">
                            <Button onClick={nextStep}>Siguiente</Button>
                        </CardFooter>
                    </>
                )}
                {currentStep === 2 && (
                    <>
                        <CardHeader>
                            <CardTitle>Sobre tu Proyecto</CardTitle>
                            <CardDescription>Describe tu idea, tu público y tus metas.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                                <Label htmlFor="projectName">Nombre del Proyecto</Label>
                                <Input id="projectName" value={formData.projectInfo.projectName} onChange={e => handleChange('projectInfo', 'projectName', e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="projectIdea">Describe tu idea o el problema que buscas resolver</Label>
                                <Textarea id="projectIdea" rows={4} value={formData.projectInfo.projectIdea} onChange={e => handleChange('projectInfo', 'projectIdea', e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="targetAudience">¿Quién es tu público objetivo?</Label>
                                <Textarea id="targetAudience" rows={3} value={formData.projectInfo.targetAudience} onChange={e => handleChange('projectInfo', 'targetAudience', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>¿Cuáles son los 3 objetivos más importantes del proyecto?</Label>
                                <Input placeholder="Objetivo 1" value={formData.projectInfo.mainGoals[0]} onChange={e => handleGoalChange(0, e.target.value)} />
                                <Input placeholder="Objetivo 2" value={formData.projectInfo.mainGoals[1]} onChange={e => handleGoalChange(1, e.target.value)} />
                                <Input placeholder="Objetivo 3" value={formData.projectInfo.mainGoals[2]} onChange={e => handleGoalChange(2, e.target.value)} />
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="competitors">¿Quiénes son tus competidores principales?</Label>
                                    <Input id="competitors" value={formData.projectInfo.competitors} onChange={e => handleChange('projectInfo', 'competitors', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="budget">Presupuesto Estimado</Label>
                                    <Select value={formData.projectInfo.budget} onValueChange={value => handleChange('projectInfo', 'budget', value)}>
                                        <SelectTrigger id="budget">
                                            <SelectValue placeholder="Selecciona un rango" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="<5k">Menos de $5,000</SelectItem>
                                            <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                                            <SelectItem value="15k-30k">$15,000 - $30,000</SelectItem>
                                            <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
                                            <SelectItem value=">50k">Más de $50,000</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-between">
                            <Button variant="outline" onClick={prevStep}>Anterior</Button>
                            <Button onClick={nextStep}>Siguiente</Button>
                        </CardFooter>
                    </>
                )}
                {currentStep === 3 && (
                     <>
                        <CardHeader>
                            <CardTitle>Alcance y Funcionalidades</CardTitle>
                            <CardDescription>¿Qué debería hacer tu aplicación y en qué plataformas?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           {projectType === 'movil' && (
                                <div className="space-y-2">
                                    <Label>¿En qué plataformas necesitas la aplicación?</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {PLATFORMS.filter(p => p.includes('iOS') || p.includes('Android')).map(platform => (
                                            <div key={platform} className="flex items-center space-x-2">
                                                <Checkbox 
                                                    id={`platform-${platform}`}
                                                    onCheckedChange={() => handlePlatformChange(platform)}
                                                    checked={formData.scopeAndFeatures.platforms.includes(platform)}
                                                />
                                                <label htmlFor={`platform-${platform}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                    {platform}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                           )}
                            <div className="space-y-2">
                                <Label>Selecciona las funcionalidades que apliquen a tu proyecto:</Label>
                                <div className="grid grid-cols-2 gap-2">
                                {relevantFeatures.map(feature => (
                                    <div key={feature} className="flex items-center space-x-2">
                                        <Checkbox 
                                            id={feature} 
                                            onCheckedChange={() => handleFeatureChange(feature)} 
                                            checked={formData.scopeAndFeatures.commonFeatures.includes(feature)}
                                        />
                                        <label htmlFor={feature} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            {feature}
                                        </label>
                                    </div>
                                ))}
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="otherFeatures">Lista otras funcionalidades clave que no estén en la lista</Label>
                                <Textarea id="otherFeatures" rows={4} value={formData.scopeAndFeatures.otherFeatures} onChange={e => handleChange('scopeAndFeatures', 'otherFeatures', e.target.value)} />
                            </div>
                        </CardContent>
                        <CardFooter className="justify-between">
                            <Button variant="outline" onClick={prevStep}>Anterior</Button>
                            <Button onClick={nextStep}>Siguiente</Button>
                        </CardFooter>
                    </>
                )}
                 {currentStep === 4 && (
                     <>
                        <CardHeader>
                            <CardTitle>Diseño y Experiencia de Usuario</CardTitle>
                            <CardDescription>Hablemos de la apariencia y la sensación.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                                <Label>¿Ya tienes una identidad de marca (logo, colores)?</Label>
                                <RadioGroup 
                                    value={formData.designAndUX.hasBrandIdentity} 
                                    onValueChange={value => handleChange('designAndUX', 'hasBrandIdentity', value)}
                                    className="flex gap-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="brand-yes" />
                                        <Label htmlFor="brand-yes">Sí</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="brand-no" />
                                        <Label htmlFor="brand-no">No</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="brandFiles">Sube tu logo y manual de marca si los tienes (opcional)</Label>
                                <Input id="brandFiles" type="file" multiple disabled />
                            </div>
                            <div className="space-y-2">
                                <Label>Menciona 2 o 3 sitios web o apps cuyo diseño te guste</Label>
                                <Input placeholder="https://www.apple.com" value={formData.designAndUX.designInspirations[0]} onChange={e => handleInspirationChange(0, e.target.value)} />
                                <Input placeholder="https://stripe.com" value={formData.designAndUX.designInspirations[1]} onChange={e => handleInspirationChange(1, e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lookAndFeel">Describe el estilo visual que buscas (p. ej., Moderno, Juguetón, Corporativo)</Label>
                                <Textarea id="lookAndFeel" rows={3} value={formData.designAndUX.lookAndFeel} onChange={e => handleChange('designAndUX', 'lookAndFeel', e.target.value)} />
                            </div>
                        </CardContent>
                        <CardFooter className="justify-between">
                            <Button variant="outline" onClick={prevStep}>Anterior</Button>
                            <Button onClick={nextStep}>Siguiente</Button>
                        </CardFooter>
                    </>
                )}
                 {currentStep === 5 && (
                    <>
                        <CardHeader>
                            <CardTitle>Contenido y Estrategia</CardTitle>
                            <CardDescription>Pensemos a futuro sobre el proyecto.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="contentCreation">¿Quién se encargará de crear el contenido inicial (textos, imágenes, etc.)?</Label>
                                <Textarea id="contentCreation" rows={3} value={formData.contentAndStrategy.contentCreation} onChange={e => handleChange('contentAndStrategy', 'contentCreation', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="marketingPlan">¿Tienes algún plan de marketing para después del lanzamiento?</Label>
                                <Textarea id="marketingPlan" rows={3} value={formData.contentAndStrategy.marketingPlan} onChange={e => handleChange('contentAndStrategy', 'marketingPlan', e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="maintenance">¿Estás interesado en un plan de mantenimiento y soporte continuo?</Label>
                                <Textarea id="maintenance" rows={3} value={formData.contentAndStrategy.maintenance} onChange={e => handleChange('contentAndStrategy', 'maintenance', e.target.value)} />
                            </div>
                        </CardContent>
                        <CardFooter className="justify-between">
                            <Button variant="outline" onClick={prevStep}>Anterior</Button>
                            <Button onClick={nextStep}>Siguiente</Button>
                        </CardFooter>
                    </>
                )}
                {currentStep === 6 && (
                    <>
                        <CardHeader>
                            <CardTitle>Archivos Adjuntos</CardTitle>
                            <CardDescription>¿Tienes documentos de referencia? Súbelos aquí.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="attachments">Arrastra y suelta archivos o haz clic para seleccionar (PDF, DOCX, imágenes)</Label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="attachments" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Haz clic para subir</span> o arrastra y suelta</p>
                                            <p className="text-xs text-muted-foreground">PDF, DOCX, PNG, JPG</p>
                                        </div>
                                        <Input id="attachments" type="file" className="hidden" multiple disabled />
                                    </label>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="justify-between">
                            <Button variant="outline" onClick={prevStep}>Anterior</Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" />
                                        Enviar Requerimientos
                                    </>
                                )}
                            </Button>
                        </CardFooter>
                    </>
                )}
            </Card>
        </form>
      </div>
    </div>
  );
}
