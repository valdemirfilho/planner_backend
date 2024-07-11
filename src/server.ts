import Fastify from "fastify"
import { prisma } from "./lib/prisma"
import { createTrip } from "./routes/create-trip"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import cors from '@fastify/cors'
import { confirmTrip } from "./routes/confirm-trip";

const app = Fastify()

app.register(cors, {
  origin: 'http://localhost:3000'
})

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);


app.register(createTrip)
app.register(confirmTrip)

app.get('/cadastrar', async () => {
  await prisma.trip.create({
    data: {
      destination: 'Fortaleza',
      starts_at: new Date(),
      ends_at: new Date()
    }
  })

  return 'Registro cadastrado com sucesso'
})

app.get('/listar', async () => {
  const trips = await prisma.trip.findMany()

  return trips
})


app.listen({ port: 5000 }).then(() => {
  console.log("Server running!")
})
