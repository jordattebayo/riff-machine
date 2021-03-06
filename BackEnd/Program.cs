using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using riffmachine.Models;
using riffmachine.DataAccess;
using System;
using System.Threading.Tasks;
using System.Configuration;
using System.Collections.Generic;
using System.Net;
using Microsoft.Azure.Cosmos;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Removing allow CORS for prod
builder.Services.AddCors(options =>
{

    options.AddPolicy(name: "*",
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
                      });
});

builder.Services.AddControllers();
builder.Services.AddDbContext<PostgreSqlContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSqlDatabase")));

// Some extra stuff just in case I need a jump off point
//builder.Services.AddCosmos<CosmosDBContext>(options => options.)
//builder.Services.AddSingleton

builder.Services.AddScoped<IDataAccessProvider, DataAccessProvider>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("*");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
