export default function Page() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-20">
      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-5xl font-light tracking-wide text-[#3a3a3a] mb-8">
          Eliminación de Datos de Usuario
        </h1>
        
        <div className="prose prose-stone max-w-none text-[#8C8C8C] leading-relaxed space-y-6">
          <p>
            En Cancagua, respetamos tu derecho a la privacidad y el control sobre tus datos personales. Si has interactuado con nuestro sitio web, realizado una reserva o vinculado tu cuenta a través de plataformas de terceros (como Facebook/Meta), tienes el derecho de solicitar la eliminación completa de tus datos de nuestros sistemas.
          </p>

          <h2 className="text-2xl font-light text-[#3a3a3a] mt-10 mb-4">¿Cómo solicitar la eliminación de tus datos?</h2>
          
          <p>Para eliminar tus datos, por favor sigue estos pasos:</p>

          <div className="bg-[#FDFBF7] p-6 rounded-lg border border-[#D3BC8D]/30 mt-6 mb-8">
            <h3 className="text-xl font-medium text-[#3a3a3a] mb-4">Paso 1: Envíanos un correo electrónico</h3>
            <p className="mb-4">
              Envía un correo a nuestro equipo de soporte con tu solicitud explícita de eliminación de datos.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Correo de contacto:</strong> hola@cancagua.cl</li>
              <li><strong>Asunto del correo:</strong> Solicitud de eliminación de datos - [Tu Nombre]</li>
              <li><strong>Información a incluir:</strong> Tu nombre completo y la dirección de correo electrónico asociada a tus reservas o cuenta vinculada.</li>
            </ul>
          </div>

          <div className="bg-[#FDFBF7] p-6 rounded-lg border border-[#D3BC8D]/30 mb-8">
            <h3 className="text-xl font-medium text-[#3a3a3a] mb-4">Paso 2: Confirmación y Procesamiento</h3>
            <p>
              Una vez recibida tu solicitud, nuestro equipo la procesará en un plazo máximo de <strong>7 días hábiles</strong>. Te enviaremos un correo de confirmación una vez que todos tus datos personales, historial de reservas y registros vinculados (incluyendo cualquier token o vinculación con Facebook/Meta) hayan sido eliminados permanentemente de nuestra base de datos.
            </p>
          </div>

          <h2 className="text-2xl font-light text-[#3a3a3a] mt-10 mb-4">Instrucciones específicas para usuarios de Facebook/Meta</h2>
          <p>
            Si has iniciado sesión utilizando Facebook, también puedes eliminar la conexión directamente desde tu cuenta de Facebook:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Ve a la <strong>Configuración y Privacidad</strong> de tu cuenta de Facebook y haz clic en <strong>Configuración</strong>.</li>
            <li>En el menú lateral, selecciona <strong>Apps y sitios web</strong>.</li>
            <li>Busca la aplicación "Cancagua" en la lista.</li>
            <li>Haz clic en <strong>Eliminar</strong> y sigue las instrucciones para confirmar la desvinculación.</li>
          </ol>
          <p className="mt-4 text-sm italic">
            Nota: Al hacer esto desde Facebook, revoques nuestro acceso a tus datos futuros, pero para eliminar los datos que ya tenemos en nuestro sistema, por favor envíanos un correo electrónico como se indica en el Paso 1.
          </p>

        </div>
      </div>
    </main>
  );
}
